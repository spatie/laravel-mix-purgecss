const mix = require('laravel-mix');
const createPurgeCssPlugin = require('./createPurgeCssPlugin');

// This is kind of an undocumented Mix function, hope it stays around! Easy to
// refactor if it'd ever cause an issue.
const rootPath = Mix.paths.root.bind(Mix.paths);

class PurgeCss {
    name() {
        return ['purgeCss', 'purgecss'];
    }

    dependencies() {
        this.requiresReload = true;

        return ['purgecss-webpack-plugin', 'glob-all'];
    }

    register(options = {}) {
        this.options = Object.assign(
            {
                enabled: mix.inProduction(),
                extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'php', 'vue'],
                globs: [],
            },
            options
        );

        this.options.globs.push(
            rootPath('app/**/*.php'),
            ...this.options.extensions.map(extension => rootPath(`resources/**/*.${extension}`))
        );
    }

    webpackConfig(config) {
        if (!this.options.enabled) {
            return;
        }

        const purgeCssPlugin = createPurgeCssPlugin(this.options);

        config.plugins.push(purgeCssPlugin);
    }
}

mix.extend('purgeCss', new PurgeCss());
