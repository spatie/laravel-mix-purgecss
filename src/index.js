const path = require('path');
const glob = require('glob-all');
const mix = require('laravel-mix');
const omit = require('lodash/omit');
const PurgecssPlugin = require('purgecss-webpack-plugin');

function createPlugin(options) {
    return new PurgecssPlugin(
        Object.assign(
            {
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
            },
            withoutCustomOptions(options)
        )
    );
}

function createOptions(options) {
    options.enabled = options.enabled || mix.inProduction();

    options.extensions = options.extensions || [
        'html',
        'js',
        'jsx',
        'ts',
        'tsx',
        'php',
        'vue',
    ];

    options.globs = options.globs || [];

    options.globs.push(
        path.resolve(__dirname, '../../../app/**/*.php'),
        ...options.extensions.map(extension =>
            path.resolve(__dirname, `../../../resources/**/*.${extension}`)
        )
    );

    return options;
}

function withoutCustomOptions(options) {
    return omit(options, ['enabled', 'globs', 'extensions']);
}

mix.purgeCss = (options = {}) => {
    options = createOptions(options);

    if (options.enabled) {
        mix.webpackConfig({
            plugins: [createPlugin(options)],
        });
    }

    return this;
};
