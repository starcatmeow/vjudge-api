const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const { default: axios } = require('axios');
const { CookieJar, Cookie } = require('tough-cookie');
const { descriptionStyle } = require('./style.js');
const { CaptchaURL, CheckLoginStatusURL, FetchContestDetailURL, FetchContestListURL, FetchProblemDescriptionURL, FetchSolutionURL, FetchSubmissionsURL, HomeURL, LoginURL, ProfileURL, SubmitProblemURL, FetchProblemDetailURL } = require('./url.js');

class VJudge{
    constructor(){
        const jar = new CookieJar();
        this.client = axios.create({ jar });
        this.client.interceptors.request.use(function (config){
            jar.getCookies(config.url, function(_, cookies) {
                config.headers.cookie = cookies.map(cookie => `${cookie.key}=${cookie.value}`).join('; ');
            });
            return config;
        })
        this.client.interceptors.response.use(function (response){
            if (response.headers['set-cookie'] instanceof Array) {
                response.headers['set-cookie'].forEach(function (c) {
                    jar.setCookie(Cookie.parse(c), response.config.url, function(){});
                });
            }
            return response;
        })
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
        this.lastLogin = new Date().getTime();
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
        const detailJson = Object.values(Object.values(dom.documentElement
                            .childNodes).find(node => node.nodeName === 'body')
                            .childNodes).find(node => node.nodeName === 'textarea').firstChild.nodeValue;
        return JSON.parse(detailJson);
    }
    async getProblemDescription(descriptionId, descriptionVersion){
        await this.ensureLoginStatus();
        const html = (await this.client.get(`${FetchProblemDescriptionURL}${descriptionId}?${descriptionVersion}`)).data;
        const dom = new DOMParser().parseFromString(html, 'text/html');
        const styleText = dom.createTextNode(descriptionStyle);
        const styleElement = dom.createElement('style');
        styleElement.appendChild(styleText);
        Object.values(dom.documentElement.childNodes)
            .find(node => node.nodeName === 'head')
            .appendChild(styleElement); // inject customized style
        const originalStyleSheet = Object.values(Object.values(dom.documentElement.childNodes)
            .find(node => node.nodeName === 'head').childNodes)
            .filter(node => node.nodeName === 'link')[0];
        originalStyleSheet.parentNode.removeChild(originalStyleSheet);
        const bodyElement = Object.values(dom.documentElement.childNodes).find(node => node.nodeName === 'body');
        const cdnScript = dom.createElement('script');
        const cdnText = dom.createTextNode('localStorage.setItem("cdnBaseUrl",\'{"val":"https://vj.ppsucxtt.cn/","version":1633630055459}\');basePath = "https://vjudge.net/";');
        cdnScript.appendChild(cdnText);
        cdnScript.setAttribute('type', 'text/javascript');
        bodyElement.appendChild(cdnScript);
        const scriptElements = Object.values(Object.values(dom.documentElement
            .childNodes).find(node => node.nodeName === 'head')
            .childNodes).filter(node => node.nodeName === 'script');
        scriptElements.forEach(scriptElement => {
            const parentNode = scriptElement.parentNode;
            const src = scriptElement.getAttributeNode('src');
            if(!src)return;
            parentNode.removeChild(scriptElement);
        });
        ["fb5f8cf1a877d10ea7fd.js","eaca2e6abbe57346b0b3.js","1145eb98e267922ce6a0.js"].forEach(js => {
            const newElement = dom.createElement('script');
            newElement.setAttribute('src', 'https://cdn.jsdelivr.net/gh/starcatmeow/vjudge-cdn/' + js);
            bodyElement.appendChild(newElement);
        })
        const modifiedHtml = new XMLSerializer().serializeToString(dom);
        return modifiedHtml;
    }
    // will throw {captcha: true, error: "Captcha is wrong."} when need captcha
    async submitCode(contestId, problemNum, code, language, captcha){
        await this.ensureLoginStatus();
        const params = new URLSearchParams();
        params.append('language', language);
        params.append('open', '0');
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
    async fetchProblemDetail(problemTextId){
        const regex = /(.*?)-(.*)/g
        const [_, oj, probNum] = regex.exec(problemTextId);
        const html = await this.client.get(`${FetchProblemDetailURL}${problemTextId}`);
        const dom = new DOMParser().parseFromString(html.data, 'text/html');
        const detailJson = Object.values(Object.values(dom.documentElement
            .childNodes).find(node => node.nodeName === 'body')
            .childNodes).find(node => node.nodeName === 'textarea').firstChild.nodeValue;
        const title = Object.values(dom.getElementById('prob-title').childNodes)
            .filter(node => node.nodeName === 'h2')[0].firstChild.nodeValue;
        const detail = JSON.parse(detailJson);
        detail.descriptions = Object.values(dom.getElementById('prob-descs').childNodes)
            .filter(node => node.nodeName === 'li')
            .map(node => ({
                id: Number.parseInt(node.getAttribute('data-id')),
                version: Number.parseInt(node.getAttribute('data-version')),
                author: node.getAttribute('data-author'),
            }));
        detail.oj = oj;
        detail.probNum = probNum;
        detail.title = title;
        return detail;
    }
}

module.exports = { VJudge };
