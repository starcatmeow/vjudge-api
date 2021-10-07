import { AxiosInstance } from "axios";

export enum Openness {
    Public = 0,
    Protected = 1,
    Private = 2,
};
export interface Contest {
    id: number;
    title: string;
    begin: Date;
    end: Date;
    openness: Openness;
    managerName: string;
    managerId: number;
    playerCount: number;
}
export interface ProblemProperty {
    title: string;
    content: string;
    hint: boolean;
}
export interface Problem {
    pid: number;
    oj: string;
    probNum: string;
    num: string;
    title: string;
    languages: Record<number, string>;
    publicDescId: number;
    publicDescVersion: number;
    properties: ProblemProperty[];
}
export interface ContestDetail {
    id: number;
    title: string;
    begin: number;
    end: number;
    openness: Openness;
    managerName: string;
    managerId: number;
    problems: Problem[];
}
export interface Solution {
    author: string;
    authorId: number;
    contestId: number;
    contestNum: string;
    isOpen: number;
    language: string;
    languageCanonical: string;
    length: number;
    oj: string;
    probNum: string;
    processing: boolean;
    runId: number;
    status: string;
    statusCanonical: string;
    statusType: number;
    submitTime: number;
}
export default class VJudge{
    client: AxiosInstance;
    async login(username: string, password: string): Promise<void>;
    async checkLoginStatus(): Promise<boolean>;
    async ensureLoginStatus(): Promise<void>;
    async listMyContest(): Promise<Contest[]>;
    async getContestDetail(contestId: string | number): Promise<ContestDetail>;
    async getProblemDescription(descriptionId: string | number, descriptionVersion: string | number): Promise<string>;
    async submitCode(contestId: string | number, problemNum: string, code: string, language: string | number, captcha?: string): Promise<number>;
    async getCaptchaImage(): Promise<string>;
    async fetchSolution(runId: string | number): Promise<Solution>;
}
