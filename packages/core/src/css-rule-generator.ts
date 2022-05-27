import CSS from "./css-types";

export default function generateCssRuleString(
  ruleName: string,
  styleProperties: CSS.Properties,
): string {
  // FIXME: We assume we have a simple flat object for now.
  const properties = Object.entries(styleProperties).map(([key, value]) => {
    return `${toKebabCase(key)}: ${String(value)};`;
  });
  return `.${ruleName} { ${properties.join("")} }`;
}

function toKebabCase(s: string): string {
  return s.replace(/([A-Z])/gm, "-$1").toLowerCase();
}
