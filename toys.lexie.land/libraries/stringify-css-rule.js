function stringifyRule(rule) {
  return rule.cssText || ''
}

export default function(stylesheet) {
  return stylesheet.cssRules
  ? Array.from(stylesheet.cssRules)
      .map(rule => stringifyRule(rule))
      .join('\n')
  : ''
}