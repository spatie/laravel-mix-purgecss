const mix = require('laravel-mix');
const defaultConfig = require('./defaultConfig');

mix.extend(
    'purgeCss',
    new (class {
        name() {
            return ['purgeCss', 'purgecss'];
        }

        register(config = {}) {
            this.enabled = config.enabled || mix.inProduction();

            this.config = Object.assign({}, defaultConfig, config);
        }

        boot() {
            if (!this.enabled) {
                return;
            }

            mix.options({
                postCss: [require('@fullhuman/postcss-purgecss')(this.config)]
            });
        }
    })()
);
