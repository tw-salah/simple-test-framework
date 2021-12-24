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

export const createResult = (testName: string, errors: unknown[], fail: AssertError | null): Result => {
    if (errors.length > 0) {
        return {name: testName, tagged: 'exception', reasons: errors}
    } else if (fail) {
        return {name: testName, tagged: 'failed', reasons: [fail]}
    } else {
        return {name: testName, tagged: 'passed'}
    }
}
