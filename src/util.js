module.exports = {
    omit(object, keys) {
        const omitted = {};

        for (const key in object) {
            if (keys.indexOf(key) === -1) {
                omitted[key] = object[key];
            }
        }

        return omitted;
    },

    flatMap(array, callback) {
        return Array.prototype.concat.apply([], array.map(callback));
    },
};
