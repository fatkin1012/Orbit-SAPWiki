const prefixSelector = require('postcss-prefix-selector');

module.exports = {
  plugins: [
    prefixSelector({
      prefix: '#plugin-sapwiki',
      transform(prefix, selector) {
        if (selector.startsWith(prefix)) {
          return selector;
        }
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return `${prefix} ${selector}`;
        }
        return `${prefix} ${selector}`;
      },
    }),
  ],
};
