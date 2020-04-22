# PurgeCSS wrapper for Laravel Mix

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-purgecss.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-purgecss)
[![npm](https://img.shields.io/npm/dt/laravel-mix-purgecss.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-purgecss)

This package adds a `purgeCss` option to Laravel Mix, which installs PurgeCSS for you with a set of sensible defaults for Laravel applications.

```js
const mix = require('laravel-mix');
require('laravel-mix-purgecss');

// ...

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss();
```

## Installation

Before you get started, make sure you're using `laravel-mix` version 5.0.0 or higher.

You can install the package with yarn or npm:

```bash
yarn add laravel-mix-purgecss --dev
```

```bash
npm install laravel-mix-purgecss --save-dev
```

Then install the extension by requiring the module in your Mix configuration.

```js
const mix = require('laravel-mix');
require('laravel-mix-purgecss');

// ...
```

PurgeCSS can be enabled by calling `.purgeCss()` in your Mix chain.

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss();
```

By default, PurgeCSS only works when building assets for production. You can override this behaviour by specifying the `enabled` option.

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss({
       enabled: true,
   });
```

Custom options can be passed when calling PurgeCSS if necessary. Visit PurgeCSS' [docs](https://purgecss.com/configuration.html#options) to learn more about the available options.

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss({ /* My options */ });
```

Our [`defaultConfig`](https://github.com/spatie/laravel-mix-purgecss/blob/master/defaultConfig.js) file contains a set of sensible defaults for Laravel applications.

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
- [CJMAXiK](https://github.com/cjmaxik)
- [Aryeh Raber](https://github.com/aryehraber)
- [All Contributors](../../contributors)

## Support us

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

Does your business depend on our contributions? Reach out and support us on [Patreon](https://www.patreon.com/spatie).
All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
