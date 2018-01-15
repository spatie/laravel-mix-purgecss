# Purgecss wrapper for Laravel Mix

[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-purgecss.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-purgecss)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/laravel-mix-purgecss/master.svg?style=flat-square)](https://travis-ci.org/spatie/laravel-mix-purgecss)

Purgecss is pretty easy to set up, but it needs some boilerplate setup. This package adds a `purgeCss` method to Laravel Mix, which installs Purgecss for you with a set of sensible defaults. Zero configuration for your average Laravel project!

```js
let mix = require('laravel-mix');
require('laravel-mix-purgecss')();

// ...

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .purgeCss();
```

The Purgecss config is inspired by [Jonathan Reinink's config](https://twitter.com/reinink/status/932599675764518913) for Tailwind CSS.

## Installation

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
require('laravel-mix-purgecss')();

// ...
```

Purgecss can then be enabled by calling `.purgeCss()` in your Mix chain.

```js
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .purgeCss();
```

Custom options can be passed when installing or when calling Purgecss, both have the same outcome.

```js
require('laravel-mix-purgecss')({ /* My options */ });

// ...

mix.purgeCss({ /* My options */ });
```

## Usage

...

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
