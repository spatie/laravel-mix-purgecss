const mix = require("laravel-mix");

mix.extend(
    "purgeCss",
    new (class {
        name() {
            return ["purgeCss"];
        }

        register(config = {}) {
            const { enabled, ...purgeCssConfig } = config;

            this.enabled = enabled !== undefined ? enabled : mix.inProduction();

            this.config = purgeCssConfig;
        }

        boot() {
            if (!this.enabled) {
                return;
            }

            mix.options({
                postCss: [
                    ...global.Config.postCss,
                    require("postcss-purgecss-laravel")(this.config),
                ],
            });
        }
    })()
);
