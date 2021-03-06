const assert = require("assert");

const { optional, pipe, validate } = require("../src");

function testValidate(rules, input, expected, additionalFunc) {
    const validationResult = validate(rules, input);
    assert.equal(validationResult.isValid, expected);
    additionalFunc && additionalFunc(validationResult);
}

describe("validate", function () {
    describe("validateOneProp", function () {
        it("should return { isValid: true } when input matches String, Number or Boolean rule", function () {
            testValidate({ prop1: "Something" }, { prop1: "Something" }, true);
            testValidate({ prop1: 636 }, { prop1: 636 }, true);
            testValidate({ prop1: true }, { prop1: true }, true);
        });
        it("should return { isValid: false } when input doesn't match String, Number or Boolean rule", function () {
            testValidate({ prop1: "Something" }, { prop1: "Something else" }, false);
            testValidate({ prop1: 636 }, { prop1: 666 }, false);
            testValidate({ prop1: true }, { prop1: undefined }, false);
        });
        it("should return { isValid: true } when input matches RegExp rule", function () {
            testValidate({ prop1: /^[0-9]{5}$/ }, { prop1: 12345 }, true);
        });
        it("should return { isValid: false } when input doesn't match RegExp rule", function () {
            testValidate({ prop1: /^[0-9]{5}$/ }, { prop1: 123456 }, false);
        });
        it("should return { isValid: true } when function rule returns true", function () {
            testValidate({ prop1: () => true }, { prop1: "anything" }, true);
        });
        it("should return { isValid: false } when function rule returns false", function () {
            testValidate({ prop1: () => false }, { prop1: "anything" }, false);
        });
        it("should return { isValid: false } with specific error message when property is missing", function () {
            testValidate({ prop1: () => true }, { noProp1: "anything" }, false, result => result.prop1 === "Missing property");
        })
    });
    describe("validateOneObject", function () {
        const rule = {
            prop1: {
                prop2: "something"
            }
        };
        it("should return { isValid: true } when input matches defined object rule", function () {
            testValidate(rule, rule, true);
        });
        it("should return { isValid: false } when input doesn't match defined object rule", function () {
            testValidate(rule, {
                prop1: {
                    prop3: "something"
                }
            }, false);
        });
    });
    describe("validateArray", function () {
        const rule = [/^[0-9]$/];
        it("should return { isValid: true } when input matches defined array rule", function () {
            testValidate(rule, [1, 2, 3], true);
        });
        it("should return { isValid: false } when input doesn't match defined array rule", function () {
            testValidate(rule, [10, 11, 12], false);
        });
    })
    describe("optional", function () {
        const rule = optional("Just some string");
        it("should return { isValid: true } when optional value not supplied", function () {
            testValidate(rule, undefined, true);
        });
        it("should return { isValid: true } when optional value is supplied", function () {
            testValidate(rule, "Just some string", true);
        });
        it("should return { isValid: false } when optional value is supplied and doesn't match defined rule", function () {
            testValidate(rule, "Just some different string", false);
        });
    });
    describe("pipe", function () {
        const rule = pipe(v => v !== true, v => v !== false);
        const regexRules = pipe(/[0-9]/, /[a-z]/);
        it("should return { isValid: true } when all the piped rules match the input", function () {
            testValidate(rule, "some valid value", true);
        });
        it("should return { isValid: false } when any of the rules doesn't match the input (first rule)", function () {
            testValidate(rule, true, false);
        });
        it("should return { isValid: false } when any of the rules doesn't match the input (second rule)", function () {
            testValidate(rule, false, false);
        });
        it("should return { isValid: true } when all the input matches all the piped regexes", function () {
            testValidate(regexRules, "0a", true);
        });
        it("should return { isValid: false } when the input doesn't match one of the piped regexes", function () {
            testValidate(regexRules, "0", false);
        });
    });
});