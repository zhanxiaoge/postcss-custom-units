const postcss = require('postcss');
const postcssPlugin = require('./index.js');
const postcssOptions = {
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
    },
  ],
};

it('Case 001', async () => {
  let input = '.rule { width: 750rpx; height: 750vpx; }';
  let output = '.rule { width: 7.5rem; height: 100vw; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 002', async () => {
  let input = '.rule { width: 0rpx; height: 0vpx; }';
  let output = '.rule { width: 0; height: 0; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 003', async () => {
  let input = '.rule { width: 0px; height: 0px; }';
  let output = '.rule { width: 0; height: 0; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 004', async () => {
  let input = '.rule { margin: 10rpx 10vpx 10rem 10vw; font-size: 10px; }';
  let output = '.rule { margin: 0.1rem 1.33333vw 10rem 10vw; font-size: 0.625rem; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 005', async () => {
  let input = ':root { --rem-10rpx: 10rpx; --vw-10vpx: 10vpx; } .rule { font-size: var(--rem-10rpx); width: var(--vw-10vpx); }';
  let output = ':root { --rem-10rpx: 0.1rem; --vw-10vpx: 1.33333vw; } .rule { font-size: var(--rem-10rpx); width: var(--vw-10vpx); }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 006', async () => {
  let input = '.rule { width: 750rpx; width: 7.5rem; margin: -375vpx; margin: -50vw; }';
  let output = '.rule { width: 7.5rem; width: 7.5rem; margin: -50vw; margin: -50vw; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 007', async () => {
  let input = '.rule { content: "24rpx"; font-family: \'24rpx\'; font-size: 24vpx; }';
  let output = '.rule { content: "24rpx"; font-family: \'24rpx\'; font-size: 3.2vw; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 008', async () => {
  let input = '.rule { background: url(24vpx.jpg); font-size: 24rpx; }';
  let output = '.rule { background: url(24vpx.jpg); font-size: 0.24rem; }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 009', async () => {
  let input = '.rule { margin: -24rpx calc(100% - 32px); height: calc(100% - 20rpx); }';
  let output = '.rule { margin: -0.24rem calc(100% - 2rem); height: calc(100% - 0.2rem); }';
  expect(postcss([postcssPlugin(postcssOptions)]).process(input).css).toBe(output);
});

it('Case 010', async () => {
  let input = '.rule { margin-top: 24rpx; margin-bottom: 24rpx; padding-top: 24rpx; padding-bottom: 24rpx; }';
  let output = '.rule { margin-top: 0.24rem; margin-bottom: 0.24rem; padding-top: 24rpx; padding-bottom: 24rpx; }';
  let options = Object.assign(postcssOptions, { propList: ['margin*', 'padding'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});

it('Case 011', async () => {
  let input = '.rule { margin-top: 24rpx; margin-bottom: 24rpx; padding: 24rpx; }';
  let output = '.rule { margin-top: 0.24rem; margin-bottom: 0.24rem; padding: 24rpx; }';
  let options = Object.assign(postcssOptions, { propList: ['margin*', '!padding'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});

it('Case 012', async () => {
  let input = '.rule { background-position-x: 10rpx; border-top-width: 10vpx; padding: 24rpx; }';
  let output = '.rule { background-position-x: 0.1rem; border-top-width: 10vpx; padding: 24rpx; }';
  let options = Object.assign(postcssOptions, { propList: ['*position*', '!*top*'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});

it('Case 013', async () => {
  let input = '.rule { width: 10rpx; height: 10vpx; }';
  let output = '.rule { width: 10rpx; width: 0.1rem; height: 10vpx; height: 1.33333vw; }';
  let options = Object.assign(postcssOptions, { replace: false, propList: ['*'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});

it('Case 014', async () => {
  let input = '@media (min-width: 1024px) { .rule { font-size: 24rpx; } }';
  let output = '@media (min-width: 64rem) { .rule { font-size: 0.24rem; } }';
  let options = Object.assign(postcssOptions, { media: true, replace: true, propList: ['*'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});

it('Case 015', async () => {
  let input = '@media (min-width: 1024px) { .rule { font-size: 24rpx; } }';
  let output = '@media (min-width: 1024px) { .rule { font-size: 0.24rem; } }';
  let options = Object.assign(postcssOptions, { media: false, replace: true, propList: ['*'] });
  expect(postcss([postcssPlugin(options)]).process(input).css).toBe(output);
});
