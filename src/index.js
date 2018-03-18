let mix = require('laravel-mix');

class purgeCss {
    name() {
        return 'purgeCss';
    }

    dependencies() {
        this.requiresReload = true;

        return ['purgecss-webpack-plugin', 'glob-all', 'lodash.omit'];
    }

    static userOptions(userOptions) {
        let options = Object.assign(
            {
                enabled: Mix.inProduction(),
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
        let omit = require('lodash.omit');
        return omit(options, ['enabled', 'globs', 'extensions']);
    }

    webpackConfig(config) {
        let PurgecssPlugin = require('purgecss-webpack-plugin');
        let path = require('path');
        let glob = require('glob-all');

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
                                                    /[A-z0-9-:\/]+/g
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

mix.extend('purgeCss', new purgeCss());
