const mix = require("laravel-mix");
const createConfig = require("./createConfig");

mix.extend(
    "purgeCss",
    new (class {
        name() {
            return ["purgeCss", "purgecss"];
        }

        register(config = {}) {
            const { enabled, ...purgeCssConfig } = config;

            this.enabled = enabled !== undefined ? enabled : mix.inProduction();

            this.config = createConfig(purgeCssConfig);
        }

        boot() {
            if (!this.enabled) {
                return;
            }

            console.log(this.config);

            mix.options({
                postCss: [
                    ...mix.config.postCss,
                    require("@fullhuman/postcss-purgecss")(this.config)
                ]
            });
        }
    })()
);
