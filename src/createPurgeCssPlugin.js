const glob = require('glob-all');
const { omit } = require('./util');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const extractAllSelectorLikeStrings = class {
    static extract(content) {
        return content.match(/[A-z0-9-:/]+/g) || [];
    }
};

module.exports = options =>
    new PurgecssPlugin(
        Object.assign(
            {
                paths: () => glob.sync(options.globs),
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
