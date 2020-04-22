const defaultConfig = require("./defaultConfig");

module.exports = function createConfig(config) {
    const { extend = {}, ...overrides } = config;

    const overriddenConfig = Object.assign({}, defaultConfig, overrides);

    Object.entries(extend).forEach(([key, value]) => {
        overriddenConfig[key] = Array.isArray(overriddenConfig[key])
            ? overriddenConfig[key].concat(value)
            : value;
    });

    return overriddenConfig;
};
