const glob = require('glob-all');
const { omit } = require('./util');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = options => {
    const globs = glob
        .sync(options.globs, { mark: true })
        .filter(f => !/\/$/.test(f));

    const pattern = options.extractorPattern || /[a-zA-Z0-9-:_/]+/g

    return new PurgecssPlugin(
        Object.assign(
            {
                paths: () => globs,
                extractors: [
                    {
                        extractor: class {
                            static extract(content) {
                                return content.match(pattern) || [];
                            }
                        },
                        extensions: options.extensions,
                    },
                ],
            },
            omit(options, ['enabled', 'globs', 'extensions'])
        )
    );
}
