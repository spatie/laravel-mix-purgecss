const glob = require('glob-all');
const { omit } = require('./util');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const extractAllSelectorLikeStrings = class {
    static extract(content) {
        return content.match(/[a-zA-Z0-9-:/]+/g) || [];
    }
};

module.exports = options => {
    const globs = glob
        .sync(options.globs, { mark: true })
        .filter(f => !/\/$/.test(f));

    return new PurgecssPlugin(
        Object.assign(
            {
                paths: () => globs,
                extractors: [
                    {
                        extractor: extractAllSelectorLikeStrings,
                        extensions: options.extensions,
                    },
                ],
            },
            omit(options, ['enabled', 'globs', 'extensions'])
        )
    );
}
