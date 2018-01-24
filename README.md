# Purgecss wrapper for Laravel Mix

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-purgecss.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-purgecss)
[![npm](https://img.shields.io/npm/dt/laravel-mix-purgecss.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-purgecss)

[Purgecss](https://www.purgecss.com/) doesn't require too much work to set up, but there's some boilerplate involved. This package adds a `purgeCss` method to Laravel Mix, which installs Purgecss for you with a set of sensible defaults. Zero configuration for your average Laravel project!

```js
let mix = require('laravel-mix');
require('laravel-mix-purgecss');

// ...

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .purgeCss();
```

The Purgecss config is inspired by [Jonathan Reinink's config](https://twitter.com/reinink/status/932599675764518913) for Tailwind CSS.

## Installation

Before you get started, make sure you're at least using version 2 of `laravel-mix`. This package isn't compatible with lower versions!

You can install the package with yarn or npm:

```bash
yarn add laravel-mix-purgecss
```

```bash
npm install laravel-mix-purgecss
```

Then install the extension by requiring the module in your Mix configuration.

```js
let mix = require('laravel-mix');
require('laravel-mix-purgecss');

// ...
```

Purgecss can then be enabled by calling `.purgeCss()` in your Mix chain.

```js
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .purgeCss();
```

Custom options can be passed when calling Purgecss if necessary.

```js
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .purgeCss({ /* My options */ });
```

## Usage

The default configuration should be good enough for an average Laravel project. In short, all html, js, php & vue files in the app and resources folders will be scanned for selectors. Purgecss is only enabled in production.

For all configuration options, refer to the [purgecss](https://github.com/FullHuman/purgecss) and [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss-webpack-plugin) docs. This Mix extension adds three more configuration options for your convenience.

| Option       | Type | Default | Description |
|--------------|------|---------|-----|
| `enabled`    | Boolean | `true` in production | Determines whether css should be purged or not |
| `globs`      | Array | Matches all php files in `app/` and all files with extensions in the `extensions` option in `resources/` | Determines which files should be scanned for selectors |
| `extensions` | Array| html, js, jsx, ts, tsx, php, vue | Determines which file types should be scanned for selectors |

Note that if you override `extensions`, the defaults will be lost! Your custom globs are merged with the default globs. If you need to fully replace the globs, use the underlying `paths` option instead.

### Example custom configuration

```js
let mix = require('laravel-mix');
let purgeCss = require('laravel-mix-purgecss');

mix
    .js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')

    .purgeCss({
        enabled: true,

        // Your custom globs are merged with the default globs. If you need to fully replace
        // the globs, use the underlying `paths` option instead.
        globs: [
            path.join(__dirname, 'node_modules/simplemde/**/*.js'),
        ],

        extensions: ['html', 'js', 'php', 'vue'],

        // Other options are passed through to Purgecss
        whitelistPatterns: [/language/, /hljs/],
    });
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email freek@spatie.be instead of using the issue tracker.

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

We publish all received postcards [on our company website](https://spatie.be/en/opensource/postcards).

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## Support us

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

Does your business depend on our contributions? Reach out and support us on [Patreon](https://www.patreon.com/spatie).
All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
