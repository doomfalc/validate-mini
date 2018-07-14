const R = require("ramda");

const validationOk = { isValid: true };

function getPropertyMessage(validationResult) {
    return validationResult.message || R.omit(["isValid"], validationResult)
}

function validateOneProp(rule, input, root) {
    const isValid = false;
    const isFunction = R.is(Function, rule);

    if (input === undefined && (!isFunction || rule.name !== "optionalRule")) {
        return { isValid, message: "Missing property" };
    }

    if (isFunction) {
        const validationResult = rule(input, root);
        if (validationResult.isValid === false || validationResult.isValid === true) {
            return validationResult;
        }
        return !!validationResult ? validationOk : { isValid, message: "Validation failed" };
    }

    if (R.is(String, rule) || R.is(Number, rule) || R.is(Boolean, rule)) {
        return input === rule ? validationOk : { isValid, message: `Expected constant ${rule}` }
    }

    if (R.is(RegExp, rule)) {
        return rule.test(input) ? validationOk : { isValid, message: "Invalid format" }
    }

    if (R.is(Array, rule)) {
        return validateArray(rule, input);
    }

    if (R.is(Object, rule)) {
        return validate(rule, input);
    }

    return { isValid };
}

function validateOneObject(props, input, root) {
    return R.keys(props).reduce((validationResult, key) => {
        const rule = props[key];
        const propValidation = validateOneProp(rule, input[key], root);

        if (propValidation.isValid === false) {
            validationResult.isValid = false;
            validationResult[key] = getPropertyMessage(propValidation);
        }

        return validationResult;
    }, { isValid: true });
}

function validateArray(props, input, root) {
    if (R.is(Array, input)) {
        return input.reduce((validationResult, item, index) => {
            const itemValidation = R.is(Object, item) ? validate(props[0], item, root) : validateOneProp(props[0], item, root);
            if (itemValidation.isValid === false) {
                validationResult.isValid = false;
                validationResult[index] = getPropertyMessage(itemValidation);
            }
            return validationResult;
        }, { isValid: true });
    }

    return { isValid: false, message: "Expected an array" };
}

function optional(rules) {
    return function optionalRule(value, root) {
        return !value || validate(rules, value, root);
    };
}

function pipe(...rules) {
    return (value, root) => {
        let validationResult = { isValid: true };
        for (const rule of rules) {
            validationResult = validate(rule, value, root);
            if (!validationResult || !validationResult.isValid) {
                return validationResult;
            }
        }
        return validationResult;
    };
}

function validate(rules, input, root = input) {
    if (R.is(Array, rules)) {
        return validateArray(rules, input, root);
    }
    if (R.is(Object, rules) && !R.is(Function, rules) && !R.is(RegExp, rules)) {
        return validateOneObject(rules, input, root);
    }
    return validateOneProp(rules, input, root);
}

module.exports = {
    validate,
    optional,
    pipe,
};
