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
        rootPath('resources/**/*.vue'),
        rootPath('resources/**/*.twig')
    ],
    defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
    whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/]
};
