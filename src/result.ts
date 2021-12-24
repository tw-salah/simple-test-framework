import {AssertError} from "./asserts"

export type Pass = {
    tagged: 'passed';
    name: string;
}

export type Failed = {
    tagged: 'failed'
    name: string;
    reasons: AssertError[]
}

export type Exception = {
    tagged: 'exception'
    name: string;
    reasons: unknown[]
}

export type Result = Pass | Failed | Exception