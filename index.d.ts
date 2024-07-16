import { AxiosInstance } from "axios";

export enum Openness {
    Public = 0,
    Protected = 1,
    Private = 2,
}
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
    spoiler: boolean;
}
export interface Problem {
    pid: number;
    oj: string;
    probNum: string;
    num: string;
    title: string;
    languages: Record<number, string>;
    enabledDescKeys: number[];
    descBriefs: ProblemDescBrief[];
    properties: ProblemProperty[];
}
export interface ProblemDescBrief {
    key: number;
    updateDate: string;
    version: number;
    author: string;
    remarks: string;
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
    additionalInfo?: string;
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
export interface Submission {
    submitterId: number;
    problemIndex: number;
    accepted: number;
    time: number;
}
export interface Description {
    id: number;
    version: number;
    author: string;
}
export interface ProblemDetail {
    accepted: boolean;
    allowSubmit: boolean;
    attempted: boolean;
    isFav: boolean;
    languages: Record<string, string>;
    problemId: number;
    properties: ProblemProperty[];
    status: number;
    descriptions: Description[];
    oj: string;
    probNum: string;
    title: string;
}
export default class VJudge{
    client: AxiosInstance;
    login(username: string, password: string): Promise<void>;
    checkLoginStatus(): Promise<boolean>;
    ensureLoginStatus(): Promise<void>;
    listMyContest(): Promise<Contest[]>;
    getContestDetail(contestId: string | number): Promise<ContestDetail>;
    getProblemDescription(descriptionId: string | number, descriptionVersion: string | number): Promise<string>;
    submitCode(contestId: string | number, problemNum: string, code: string, language: string | number, captcha?: string): Promise<number>;
    getCaptchaImage(): Promise<string>;
    fetchSolution(runId: string | number): Promise<Solution>;
    fetchSubmissions(contestId: string | number): Promise<Submission[]>;
    fetchProblemDetail(problemTextId: string): Promise<ProblemDetail>;
}
