module.exports.default = class Extractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
};
