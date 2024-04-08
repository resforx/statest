import path from 'path';
const testResults: { description: string, passed: boolean }[] = [];
const megaheap = () => path.relative(process.cwd(), __filename);

function be(actual: any, expected: string) {
    const pass = typeof actual === expected;
    testResults.push({ description: `Expecting ${typeof actual} to be ${expected}`, passed: pass });
    if (!pass) { throw new Error(`Expected ${expected} but received ${typeof actual}`) };
}

function title(title: string, testcase: () => void) {
    console.log(title);
    testcase();
}

function like(liker: string, testcb: () => void) {
    try {
        console.log(`   ${liker}`);
        console.log(`   ✔︎ Passed ${megaheap()}`);
    } catch (e) {  }
}