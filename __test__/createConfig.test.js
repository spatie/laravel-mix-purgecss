global.Mix = {
    paths: {
        root: path => path
    }
};

const createConfig = require("../src/createConfig");

test("it can pass through the default config", () => {
    expect(createConfig({})).toMatchSnapshot();
});

test("it can override the default config", () => {
    const config = {
        content: ["resource/js/**/*.js"]
    };

    expect(createConfig(config)).toMatchSnapshot();
});

test("it can extend the default config", () => {
    const config = {
        extend: {
            content: ["vendor/spatie/menu/**/*.php"]
        }
    };

    expect(createConfig(config)).toMatchSnapshot();
});

test("it can extend and override the default config", () => {
    const config = {
        whitelistPatterns: [],
        extend: {
            content: ["vendor/spatie/menu/**/*.php"]
        }
    };

    expect(createConfig(config)).toMatchSnapshot();
});
