const glob = require('glob-all');
const mix = require('laravel-mix');
const omit = require('lodash.omit');
const Extractor = require('./src/Extractor');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const defaults = {
    enabled: mix.inProduction(),
    globs: [
        mix.paths.root('app/**/*.php'),
        mix.paths.root('resources/views/**/*.blade.php'),
        mix.paths.root('resources/assets/js/**/*.vue'),
        mix.paths.root('resources/assets/js/**/*.js'),
    ],
    extensions: ['html', 'js', 'php', 'vue'],
};

function createPlugin(options) {
    options = { ...defaults, ...options };

    return new PurgecssPlugin({
        paths: glob.sync(options.globs),
        extractors: [
            {
                extractor: Extractor,
                extensions: options.extensions,
            },
        ],
        ...withoutCustomOptions(options),
    });
}

function withoutCustomOptions(options) {
    return omit(options, Object.keys(defaults));
}

mix.purgeCss = function(options) {
    if (options.enabled) {
        mix.webpackConfig({
            plugins: [createPlugin({ ...defaults, ...options })],
        });
    }

    return mix;
};
