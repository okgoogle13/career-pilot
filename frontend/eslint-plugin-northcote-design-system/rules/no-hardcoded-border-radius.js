module.exports = {
  meta: {
    type: 'problem',
    docs: { description: 'No hardcoded borderRadius in style objects' },
    messages: { hardcodedRadius: 'Use CSS variables or Tailwind classes instead of hardcoded borderRadius' },
  },
  create(context) {
    return {
      Property(node) {
        if (node.key.name === 'borderRadius' && node.value.type === 'Literal') {
          context.report({ node, messageId: 'hardcodedRadius' });
        }
      },
    };
  },
};
