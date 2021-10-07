import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { descriptionStyle } from './style.js';
import { CaptchaURL, CheckLoginStatusURL, FetchContestDetailURL, FetchContestListURL, FetchProblemDescriptionURL, FetchSolutionURL, LoginURL, SubmitProblemURL } from './url.js';
export const Openness = {
    Public: 0,
    Protected: 1,
    Private: 2,
};
export class VJudge{
    constructor(){
        const jar = new CookieJar();
        this.client = wrapper(axios.create({ jar }));
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
    }
    async checkLoginStatus(){
        const res = await this.client.post(CheckLoginStatusURL);
        const result = res.data;
        return result;
    }
    async ensureLoginStatus(){
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
        const html = (await this.client.get(FetchContestDetailURL + contestId)).data;
        const dom = new DOMParser().parseFromString(html, 'text/html');
        console.log(dom.documentElement);
        const detailJson = Object.values(Object.values(dom.documentElement
                            .childNodes).find(node => node.nodeName === 'body')
                            .childNodes).find(node => node.nodeName === 'textarea').firstChild.nodeValue;
        return JSON.parse(detailJson);
    }
    async getProblemDescription(descriptionId, descriptionVersion){
        const html = (await this.client.get(`${FetchProblemDescriptionURL}${descriptionId}?${descriptionVersion}`)).data;
        const dom = new DOMParser().parseFromString(html, 'text/html');
        const styleElement = Object.values(Object.values(dom.documentElement
                            .childNodes).find(node => node.nodeName === 'head')
                            .childNodes).find(node => node.nodeName === 'style');
        styleElement.firstChild.data = descriptionStyle;
        const modifiedHtml = new XMLSerializer().serializeToString(dom);
        return modifiedHtml;
    }
    // will throw {captcha: true, error: "Captcha is wrong."} when need captcha
    async submitCode(contestId, problemNum, code, language, captcha){
        const params = {
            language,
            share: 0,
            source: Buffer.from(code).toString('base64'),
            captcha: captcha || '',
            password: ''
        };
        const res = await axios.post(`${SubmitProblemURL}${contestId}/${problemNum}`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const data = res.data;
        if (data.error) throw data;
        return data.runId;
    }
    async getCaptchaImage(){
        const res = await axios.get(CaptchaURL + new Date().getTime(), { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(res.data).toString('base64');
        return imageBase64;
    }
    async fetchSolution(runId){
        const res = await axios.get(`${FetchSolutionURL}${runId}`);
        return res.data;
    }
}
