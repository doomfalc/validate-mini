function is(type, obj) {
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