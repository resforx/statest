import { t, title, like } from '../src/index';

title("type big test", () => {
    like("type little test", () => {
        t(441).be("number");
        t({}).be("object");
        t([1, 2, 3]).be("object");
        t(["a", "b"]).be("string[]");
    });
});