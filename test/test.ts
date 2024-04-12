import { t, title, like } from '../src/index';

title("type big test", () => {
    like("type little test", () => {
        t(441).be("number");
        t({}).be("object");
        t([1, 2, 3]).be("object");
        t(["a", "b"]).be("string[]");
    });
});

title("equalbe test", () => {
    like("number[] be objects", () => {
        t([1, 2, 3]).be("object");
    });

    like("number[] equalbe object", () => {
        t([1, 2, 3, 4, 5, 5]).equalBe("number[]")
    });

    like("object equalbe {}", () => {
        t({ a: 1, b: 2 }).be("object");
    });

    like("object equalbe {}", () => {
        t({ a: 1, b: 2 }).equalBe("{ [string] }");
    });
});