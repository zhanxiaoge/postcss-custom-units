# postcss-unitlist [![NPM version](https://badge.fury.io/js/postcss-unitlist.svg)](http://badge.fury.io/js/postcss-unitlist)

[PostCSS] plugin that can customize any unit and convert it to the specified unit according to the formula. Some of the design of this project is from [postcss-pxtorem].

[PostCSS]: https://github.com/postcss/postcss

[postcss-pxtorem]: https://github.com/cuth/postcss-pxtorem

## Install

```shell
$ npm install postcss-unitlist --save-dev
```

## Options

```js
{
  media: false,
  replace: true,
  propList: ['*'],
  unitList: [
    {
      math: '$word / 16',
      word: 'px',
      unit: 'rem',
    },
    {
      math: '$word / 100',
      word: 'rpx',
      unit: 'rem',
    },
    {
      math: '100 / 750 * $word',
      word: 'vpx',
      unit: 'vw',
    }
  ]
}
```

- `media` (Boolean) Allows conversion of customize units in media queries. Default: `false`
- `replace` (Boolean) Replace rules that contain customize units instead of adding fallbacks. Default: `true`
- `propList` (Array) Properties that allow conversion to customize units. Default: `['*']`
  - Values need to be exact matches.
  - Use wildcard `*` to enable all properties. Example: `['*']`
  - Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
  - Use `!` to not match a property. Example: `['*', '!letter-spacing']`
  - Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']`
- `unitList` (Array) List of matching rules for customize units. Default: `[]`. Plugin will not work by default.
- `exclude` (String, Regexp, Function) The file path to ignore and leave as the original unit. Default: `/node_modules/i`
    - If value is string, it checks to see if file path contains the string.
        - `'exclude'` will match `\project\postcss-pxtorem\exclude\path`
    - If value is regexp, it checks to see if file path matches the regexp.
        - `/exclude/i` will match `\project\postcss-pxtorem\exclude\path`
    - If value is function, you can use exclude function to return a true and the file will be ignored.
        - the callback will pass the file path as  a parameter, it should returns a Boolean result.
        - `function (file) { return file.indexOf('exclude') !== -1; }`

## Input/Output

```css
// Input

.rule {
  width: 750rpx;
  height: 750vpx;
  font-size: 0rpx;
  border-radius: 0px;
}

@media (min-width: 1024px) { 
  .rule {
    font-size: 24rpx;
  } 
}

// Output

.rule {
  width: 7.5rem;
  height: 100vw;
  font-size: 0;
  border-radius: 0;
}

@media (min-width: 1024px) { 
  .rule {
    font-size: 0.24rem;
  } 
}
```
