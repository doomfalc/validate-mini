function is(type, obj) {
    if (obj === false) {
        return type === Boolean;
    }
    return obj && type && obj.constructor.name === type.name;
}

function prune(obj) {
    const pruned = { ...obj };
    delete pruned.isValid;
    return pruned;
}

module.exports = {
    is,
    prune,
};