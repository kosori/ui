/** Drops `::highlight()` rules that Lightning CSS rejects in production builds. */
const dropUnsupportedHighlight = () => ({
  postcssPlugin: 'drop-unsupported-highlight',
  Rule(rule) {
    if (rule.selector.includes('::highlight(')) {
      rule.remove();
    }
  },
});

export default dropUnsupportedHighlight;
