const assert = require("assert");

const is = require("../src/is");

function testOneIsFunc(func, input, expected) {
    const validationResult = func(input);
    assert.equal(validationResult.isValid, expected);
}

describe("is", function () {
    describe("array", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneIsFunc(is.array, [ "Something" ], true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.array, "Something", false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.array, is.array);
        })
    });
    describe("boolean", function () {
        it("should return { isValid: true } when value strictly equals false", function () {
            testOneIsFunc(is.boolean, false, true);
        });
        it("should return { isValid: true } when value strictly equals true", function () {
            testOneIsFunc(is.boolean, true, true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.boolean, "Something", false);
        });
        it("should strictly verify the original type without conversion and return { isValid: false }", function () {
            testOneIsFunc(is.boolean, 0, false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.boolean, is.boolean);
        })
    });
    describe("func", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneIsFunc(is.func, () => true, true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.func, "Something", false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.func, is.func);
        })
    });
    describe("number", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneIsFunc(is.number, 1337, true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.number, "Something", false);
        });
        it("should strictly verify the original type without conversion and return { isValid: false }", function () {
            testOneIsFunc(is.number, "1337", false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.number, is.number);
        })
    });
    describe("object", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneIsFunc(is.object, { prop: "Something" }, true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.object, "Something", false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.object, is.object);
        })
    });
    describe("string", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneIsFunc(is.string, "Something", true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneIsFunc(is.string, 0, false);
        });
        it("should strictly verify the original type without conversion and return { isValid: false }", function () {
            testOneIsFunc(is.string, 1337, false);
        });
        it("should return the same reference when calling helpers several times", function () {
            assert.equal(is.string, is.string);
        })
    });
});

// TODO: test reference equality