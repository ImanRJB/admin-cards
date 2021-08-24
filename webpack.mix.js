let mix = require('laravel-mix')

// Cards

mix
  .setPublicPath('dist')
  .js('resources/js/cards.js', 'js')
  .sass('resources/sass/cards.scss', 'css');
