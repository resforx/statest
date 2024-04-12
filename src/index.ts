import path from 'path';
const testResults: { description: string, passed: boolean }[] = [];
const megaheap = () => path.relative(process.cwd(), require.main!.filename);
type AnyLike =
    | number
    | string
    | object
    | symbol
    | []
    | {};

function be(actual: AnyLike, expected: string) {
    const pass = typeof actual === expected;
    testResults.push({ description: `Expecting ${typeof actual} to be ${expected}`, passed: pass });
    if (!pass) { throw new Error(`Expected ${expected} but received ${typeof actual}`) };
}

function equalBe(actual: any, expected: string) {
    const pass = typeof actual === expected

    if (expected === "number[]") {
        return Array.isArray(actual) && actual.every(el => typeof el === 'number');
    }
    else if (expected === "string[]") {
        return Array.isArray(actual) && actual.every(el => typeof el === 'string');
    }
    else if (expected === "{ [key: string]: number }") {
        if (typeof actual !== 'object' || actual === null) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        for (const key in actual) {
            if (typeof actual[key] !== 'number') throw new Error(`Expected ${expected} but received ${typeof actual}`);
        }
        return true;
    }
    else if (expected === "object") {
        return typeof actual === 'object' && actual !== null;
    }
    else if (expected === "{ [key: string]: any }") {
        if (typeof actual !== 'object' || actual === null) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        for (const key in actual) {
            if (typeof key !== 'string') throw new Error(`Expected ${expected} but received ${typeof actual}`);
        }
        return true;
    }
    else if (expected === "Array") {
        return Array.isArray(actual);
    }
    else if (expected === "{ [key: string]: Array<any> }") {
        if (typeof actual !== 'object' || actual === null) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        for (const key in actual) {
            if (!Array.isArray(actual[key])) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        }
        return true;
    }
    else if (expected === "{ [key: string]: object }") {
        if (typeof actual !== 'object' || actual === null) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        for (const key in actual) {
            if (typeof actual[key] !== 'object' || actual[key] === null || Array.isArray(actual[key])) throw new Error(`Expected ${expected} but received ${typeof actual}`);
        }
        return true;
    }
}


function title(title: string, testcase: () => void) {
    console.log(title);
    testcase();
}

function like(liker: string, testcb: () => void) {
    try {
        console.log(`   ${liker}`);
        testcb();
        console.log(`   ✔︎ Passed ./${megaheap()}`);
    } catch (e) { console.log(`✘ Failed: ${(e as Error).message}`); }
}

function t(value: AnyLike) {
    return {
        be(expected: string) {
            be(value, expected);
        },
        equalBe(expecteds: string) {
            equalBe(value, expecteds);
        }
    }
}

export { title, like, t };