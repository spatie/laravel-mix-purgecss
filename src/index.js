const path = require('path');
const glob = require('glob-all');
const mix = require('laravel-mix');
const omit = require('lodash/omit');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const defaults = {
    enabled: mix.inProduction(),
    globs: [
        path.resolve(__dirname, '../../../app/**/*'),
        path.resolve(__dirname, '../../../resources/**/*'),
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
    options = { ...defaults, ...options };

    if (options.enabled) {
        mix.webpackConfig({
            plugins: [createPlugin(options)],
        });
    }
};

module.exports.defaults = defaults;
