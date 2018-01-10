const path = require('path');
const glob = require('glob-all');
const mix = require('laravel-mix');
const omit = require('lodash.omit');
const Extractor = require('./Extractor');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const defaults = {
    globs: [
        path.resolve(__dirname, '../../../app/**/*.php'),
        path.resolve(__dirname, '../../../resources/views/**/*.blade.php'),
        path.resolve(__dirname, '../../../resources/assets/js/**/*.vue'),
        path.resolve(__dirname, '../../../resources/assets/js/**/*.js'),
    ],
    extensions: ['html', 'js', 'php', 'vue'],
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
    return omit(options, ['globs', 'extensions']);
}

module.exports = (options = {}) => createPlugin({ ...defaults, ...options });
