const R = require("ramda");

function returnValidationResult(success, errorMessage) {
    return { 
        isValid: success,
        message: success ? undefined : errorMessage
    };
}

function oneOf(...values) {
    return value => returnValidationResult(values.includes(value), "Unexpected value");
}

function range(min, max) {
    return value => returnValidationResult(value >= min && value <= max, "Value is out of range");
}

function length(min, max) {
    return value => returnValidationResult(value.length >= min && value.length <= max, "Invalid length");
}

function is(type) {
    return value => returnValidationResult(R.is(type, value), "Unexpected type");
}

module.exports = {
    is,
    length,
    oneOf,
    range
};
