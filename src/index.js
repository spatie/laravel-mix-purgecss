const path = require('path');
const glob = require('glob-all');
const mix = require('laravel-mix');
const omit = require('lodash/omit');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const defaults = {
    enabled: mix.inProduction(),
    globs: [
        path.resolve(__dirname, '../../../app/**/*.php'),
        path.resolve(__dirname, '../../../resources/**/*.js'),
        path.resolve(__dirname, '../../../resources/**/*.jsx'),
        path.resolve(__dirname, '../../../resources/**/*.ts'),
        path.resolve(__dirname, '../../../resources/**/*.tsx'),
        path.resolve(__dirname, '../../../resources/**/*.php'),
        path.resolve(__dirname, '../../../resources/**/*.vue'),
    ],
    extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'php', 'vue'],
};

function createPlugin(options) {
    return new PurgecssPlugin({
        paths: () => glob.sync(options.globs),
        extractors: [
            {
                extractor: class {
                    static extract(content) {
                        return content.match(/[A-z0-9-:\/]+/g) || [];
                    }
                },
                extensions: options.extensions,
            },
        ],
        ...withoutCustomOptions(options),
    });
}

function withoutCustomOptions(options) {
    return omit(options, ['enabled', 'globs', 'extensions']);
}

mix.purgeCss = (options = {}) => {
    // We don't want to overwrite the globs so the user can append instead of
    // replace. If it needs to be replaced instead, use the underlying `paths`
    // option.
    const globs = defaults.globs.concat(options.globs || []);

    options = { ...defaults, ...options, globs };

    if (options.enabled) {
        mix.webpackConfig({
            plugins: [createPlugin(options)],
        });
    }
};

module.exports.defaults = defaults;
