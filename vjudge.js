const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const { descriptionStyle } = require('./style.js');
const { CaptchaURL, CheckLoginStatusURL, FetchContestDetailURL, FetchContestListURL, FetchProblemDescriptionURL, FetchSolutionURL, FetchSubmissionsURL, HomeURL, LoginURL, ProfileURL, SubmitProblemURL } = require('./url.js');

class VJudge{
    constructor(){
        const jar = new CookieJar();
        this.client = wrapper(axios.create({ jar }));
        this.lastLogin = 0;
    }
    async login(username, password){
        const params = new URLSearchParams();
        if (username) {this.username = username;}
        if (password) {this.password = password;}
        params.append('username', this.username);
        params.append('password', this.password);
        const res = await this.client.post(LoginURL, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const result = res.data;
        if (result !== 'success')throw result;
        const profileHtml = (await this.client.get(ProfileURL + username)).data;
        const profileDom = new DOMParser().parseFromString(profileHtml, 'text/html');
        const userId = Object.values(profileDom.getElementById('visitor_userId').attributes).find(attr => attr.name === 'value').value;
        this.lastLogin = new Date().getTime();
        return Number.parseInt(userId);
    }
    async checkLoginStatus(){
        const res = await this.client.post(CheckLoginStatusURL);
        const result = res.data;
        return result;
    }
    async ensureLoginStatus(){
        if(new Date().getTime() - this.lastLogin <= 1000 * 60 * 15)return;
        if(!(await this.checkLoginStatus()))
            await this.login();
    }
    async listMyContest(){
        await this.ensureLoginStatus();
        const params = {
            draw: 1,
            start: 0,
            length: 100,
            sortDir: 'desc',
            sortCol: 0,
            category: 'mine'
        }
        const res = await this.client.get(FetchContestListURL, { params });
        const data = res.data.data.map(contest => ({
            id: contest[0],
            title: contest[1],
            begin: new Date(contest[2]),
            end: new Date(contest[3]),
            openness: contest[4],
            managerName: contest[5],
            managerId: contest[6],
            playerCount: contest[13]
        }));
        return data;
    }
    async getContestDetail(contestId){
        await this.ensureLoginStatus();
        const html = (await this.client.get(FetchContestDetailURL + contestId)).data;
        const dom = new DOMParser().parseFromString(html, 'text/html');
        console.log(dom.documentElement);
        const detailJson = Object.values(Object.values(dom.documentElement
                            .childNodes).find(node => node.nodeName === 'body')
                            .childNodes).find(node => node.nodeName === 'textarea').firstChild.nodeValue;
        return JSON.parse(detailJson);
    }
    async getProblemDescription(descriptionId, descriptionVersion){
        await this.ensureLoginStatus();
        const html = (await this.client.get(`${FetchProblemDescriptionURL}${descriptionId}?${descriptionVersion}`)).data;
        const dom = new DOMParser().parseFromString(html, 'text/html');
        const styleElement = Object.values(Object.values(dom.documentElement
                            .childNodes).find(node => node.nodeName === 'head')
                            .childNodes).find(node => node.nodeName === 'style');
        styleElement.firstChild.data = descriptionStyle;
        const scriptElements = Object.values(Object.values(dom.documentElement
            .childNodes).find(node => node.nodeName === 'body')
            .childNodes).filter(node => node.nodeName === 'script');
        scriptElements.forEach(scriptElement => {
            const parentNode = scriptElement.parentNode;
            const src = scriptElement.getAttributeNode('src');
            if(!src)return;
            const newElement = dom.createElement('script');
            newElement.setAttribute('src', 'https://vjudge.net' + src.value);
            parentNode.removeChild(scriptElement);
            parentNode.appendChild(newElement);
        });
        const headElement = Object.values(dom.documentElement.childNodes).find(node => node.nodeName === 'head');
        const cdnScript = dom.createElement('script');
        const cdnText = dom.createTextNode('localStorage.setItem("cdnBaseUrl",\'{"val":"https://vj.ppsucxtt.cn/","version":1633630055459}\')');
        cdnScript.appendChild(cdnText);
        cdnScript.setAttribute('type', 'text/javascript');
        headElement.appendChild(cdnScript);
        const modifiedHtml = new XMLSerializer().serializeToString(dom);
        return modifiedHtml;
    }
    // will throw {captcha: true, error: "Captcha is wrong."} when need captcha
    async submitCode(contestId, problemNum, code, language, captcha){
        await this.ensureLoginStatus();
        const params = new URLSearchParams();
        params.append('language', language);
        params.append('share', '0');
        params.append('source', Buffer.from(encodeURIComponent(code)).toString('base64'));
        params.append('captcha', captcha || '');
        params.append('password', '');
        const res = await this.client.post(`${SubmitProblemURL}${contestId}/${problemNum}`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const data = res.data;
        if (data.error) throw data;
        return data.runId;
    }
    async getCaptchaImage(){
        await this.ensureLoginStatus();
        const res = await this.client.get(CaptchaURL + new Date().getTime(), { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(res.data).toString('base64');
        return imageBase64;
    }
    async fetchSolution(runId){
        await this.ensureLoginStatus();
        const res = await this.client.get(`${FetchSolutionURL}${runId}`);
        return res.data;
    }
    async fetchSubmissions(contestId){
        await this.ensureLoginStatus();
        const res = await this.client.get(`${FetchSubmissionsURL}${contestId}`);
        return res.data.submissions.map(submission => ({
            submitterId: submission[0],
            problemIndex: submission[1],
            accepted: submission[2],
            time: submission[3]
        }));
    }
}

module.exports = { VJudge };
