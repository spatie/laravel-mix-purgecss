module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2017,
    },
    env: {
        node: true,
        jest: true,
    },
    globals: {
        Mix: true,
    },
};
