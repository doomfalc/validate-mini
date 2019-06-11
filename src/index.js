const validator = require("./validation"); 

module.exports = {
    ...validator,
    is: require("./is"),
    utils: require("./utils"),
};
