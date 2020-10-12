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

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/laravel-mix-purgecss.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/laravel-mix-purgecss)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

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

### Important notice for `mix.postCss` or `postcss.config.js` users

When you use `mix.postCss()` or a seperate `postcss.config.js` file, Mix _overrides_ all other PostCSS plugins, including the PurgeCSS instance added by this plugin.

To work around this issue, either:

1) Include your PostCSS plugins with `mix.options()`

```diff
  const mix = require('laravel-mix');
  require('laravel-mix-purgecss');

  mix.js('resources/js/app.js', 'public/js')
-     .postCss('resources/sass/app.css', 'public/css', [
-         require('tailwindcss')(),
-     ])
+     .postCss('resources/sass/app.css', 'public/css')
+     .options({
+         postCss: [require('tailwindcss')]
+     })
      .purgeCss();
```

2) Don't use this package, and use [`postcss-purgecss-laravel`](https://github.com/spatie/postcss-purgecss-laravel) instead

```diff
  const mix = require('laravel-mix');
- require('laravel-mix-purgecss');

  mix.js('resources/js/app.js', 'public/js')
      .postCss('resources/sass/app.css', 'public/css', [
          require('tailwindcss')(),
+         require('postcss-purgecss-laravel')({ /* ... */ }),
      ])
      .purgeCss();
```

## PurgeCSS customization

Custom options can be passed when calling PurgeCSS if necessary. Visit PurgeCSS' [docs](https://purgecss.com/configuration.html#options) to learn more about the available options.

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss({
       content: [path.join(__dirname, 'vendor/spatie/menu/**/*.php')],
       whitelistPatterns: [/hljs/],
   });
```

Passing options will _override_ the package defaults. If you want to _extend_ the package defaults, wrap them in an `extend` object.

```js
mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .purgeCss({
       extend: {
           content: [path.join(__dirname, 'vendor/spatie/menu/**/*.php')],
           whitelistPatterns: [/hljs/],
       },
   });
```

This package uses [`postcss-purgecss-laravel`](https://github.com/spatie/postcss-purgecss-laravel) under the hood, which has the following defaults:

```js
const defaultConfig = {
    content: [
        "app/**/*.php",
        "resources/**/*.html",
        "resources/**/*.js",
        "resources/**/*.jsx",
        "resources/**/*.ts",
        "resources/**/*.tsx",
        "resources/**/*.php",
        "resources/**/*.vue",
        "resources/**/*.twig",
    ],
    defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
}
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email freek@spatie.be instead of using the issue tracker.

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Kruikstraat 22, 2018 Antwerp, Belgium.

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
