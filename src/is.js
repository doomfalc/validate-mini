const is = require("./utils").is;

const array = is(Array);
const boolean = is(Boolean);
const func = is(Function);
const number = is(Number);
const object = is(Object);
const string = is(String);

module.exports = {
    array,
    boolean,
    func,
    number,
    object,
    string,
};