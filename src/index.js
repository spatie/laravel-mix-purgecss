const path = require('path');
const glob = require('glob-all');
const mix = require('laravel-mix');
const { omit } = require('./util');
const PurgecssPlugin = require('purgecss-webpack-plugin');

class PurgeCss {
    name() {
        return 'purgeCss';
    }

    dependencies() {
        this.requiresReload = true;

        return ['purgecss-webpack-plugin', 'glob-all', 'lodash.omit'];
    }

    static userOptions(userOptions) {
        const options = Object.assign(
            {
                enabled: mix.inProduction(),
                extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'php', 'vue'],
                globs: [],
            },
            userOptions
        );

        options.globs.push(
            path.resolve(__dirname, '../../../app/**/*.php'),
            ...options.extensions.map(extension =>
                path.resolve(__dirname, `../../../resources/**/*.${extension}`)
            )
        );

        return options;
    }

    register(userOptions = {}) {
        this.options = purgeCss.userOptions(userOptions);
    }

    static withoutCustomOptions(options) {
        return omit(options, ['enabled', 'globs', 'extensions']);
    }

    webpackConfig(config) {
        if (this.options.enabled) {
            config.plugins.push(
                new PurgecssPlugin(
                    Object.assign(
                        {
                            paths: () => glob.sync(this.options.globs),
                            extractors: [
                                {
                                    extractor: class {
                                        static extract(content) {
                                            return (
                                                content.match(
                                                    /[A-z0-9-:/]+/g
                                                ) || []
                                            );
                                        }
                                    },
                                    extensions: this.options.extensions,
                                },
                            ],
                        },
                        purgeCss.withoutCustomOptions(this.options)
                    )
                )
            );
        }
    }
}

mix.extend('purgeCss', new PurgeCss());
