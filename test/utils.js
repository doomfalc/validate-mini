const assert = require("assert");

const utils = require("../src/utils");

function testOneUtilFunc(func, input, expected) {
    const validationResult = func(input);
    assert.equal(validationResult.isValid, expected);
}

describe("utils", function () {
    describe("is", function () {
        it("should return { isValid: true } when expected type matches", function () {
            testOneUtilFunc(utils.is(String), "Something", true);
        });
        it("should return { isValid: false } when expected type doesn't match", function () {
            testOneUtilFunc(utils.is(Object), "Something", false);
        });
        it("should strictly verify the original type without conversion and return { isValid: false }", function () {
            testOneUtilFunc(utils.is(Number), "636", false);
        });
    });
    describe("length", function () {
        it("should return { isValid: true } when input length is between min and max", function () {
            testOneUtilFunc(utils.length(1, 10), "12345", true);
        });
        it("should return { isValid: true } when input length equals expected min", function () {
            testOneUtilFunc(utils.length(1, 10), "1", true);
        });
        it("should return { isValid: false } when input length equals expected max", function () {
            testOneUtilFunc(utils.length(1, 10), "1234567890", true);
        });
        it("should return { isValid: false } when input length is lower than expected min", function () {
            testOneUtilFunc(utils.length(1, 10), "", false);
        });
        it("should return { isValid: false } when input length is greater than expected max", function () {
            testOneUtilFunc(utils.length(1, 10), "12345678900", false);
        });
    });
    describe("oneOf", function () {
        it("should return { isValid: true } when input is included in defined values", function () {
            testOneUtilFunc(utils.oneOf("value1", "value2", "value3"), "value2", true);
        })
        it("should return { isValid: false } when input is not included in defined values", function () {
            testOneUtilFunc(utils.oneOf("value1", "value2", "value3"), undefined, false);
        })
    });
    describe("range", function () {
        it("should return { isValid: true } when input is between min and max", function () {
            testOneUtilFunc(utils.range(1, 10), 5, true);
        });
        it("should return { isValid: true } when input equals expected min", function () {
            testOneUtilFunc(utils.range(1, 10), 1, true);
        });
        it("should return { isValid: false } when input equals expected max", function () {
            testOneUtilFunc(utils.range(1, 10), 10, true);
        });
        it("should return { isValid: false } when input is lower than expected min", function () {
            testOneUtilFunc(utils.range(1, 10), 0, false);
        });
        it("should return { isValid: false } when input is greater than expected max", function () {
            testOneUtilFunc(utils.range(1, 10), 20, false);
        });
    });
});