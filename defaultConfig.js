const rootPath = Mix.paths.root.bind(Mix.paths);

module.exports = {
    content: [
        rootPath('app/**/*.php'),
        rootPath('resources/**/*.html'),
        rootPath('resources/**/*.js'),
        rootPath('resources/**/*.jsx'),
        rootPath('resources/**/*.ts'),
        rootPath('resources/**/*.tsx'),
        rootPath('resources/**/*.php'),
        rootPath('resources/**/*.vue')
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/]
};
