const mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix.sass('resources/assets/sass/app.scss', 'public/css').purgeCss({
    enabled: true,
});
