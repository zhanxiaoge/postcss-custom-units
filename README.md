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
    media: true,
    replace: true,
    propList: ['*'],
    unitList: [
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

- `media` (Boolean) Allows conversion of customize units in media queries.
- `replace` (Boolean) Replace rules that contain customize units instead of adding fallbacks.
- `propList` (Array) Properties that allow conversion to customize units.
    - Values need to be exact matches.
    - Use wildcard `*` to enable all properties. Example: `['*']`
    - Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
    - Use `!` to not match a property. Example: `['*', '!letter-spacing']`
    - Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']`
- `unitList` (Array) List of matching rules for customize units.

## Input/Output

```css
// Input

.rule {
    width: 750rpx;
    height: 750vpx;
    font-size: 0rpx;
    border-radius: 0px;
}

@media (min-width: 1024rpx) { 
    .rule {
        font-size: 24rpx;
    } 
}

// Output

.rule {
    width: 7.5rem;
    height: 100vw;
    font-size: 0;
    border-radius: 0px;
}

@media (min-width: 10.24rem) { 
    .rule {
        font-size: 0.24rem;
    } 
}
```
