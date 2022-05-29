import generateCssClassName from "../class-name-generator";
import generateCssRuleString from "../css-rule-generator";
import CSS from "../css-types";
import getRoot, { CssSheet } from "../root";

interface CssOptions {
  index: number;
  prefix: string;
}

export default function css(
  styleProperties: CSS.Properties,
  options?: Partial<CssOptions>,
): string {
  const { sheet } = getRoot();
  const defaultOptions = {
    index: [...sheet.cssRules].length,
    prefix: "",
  };
  const { index, prefix } = { ...defaultOptions, ...options };

  const ruleName = prefix + generateCssClassName(styleProperties);
  const cssRuleString: string = generateCssRuleString(
    `.${ruleName}`,
    styleProperties,
  );

  const alreadyThere = findPositionInSheet(sheet, cssRuleString);
  if (alreadyThere) {
    return ruleName;
  }
  sheet.insertRule(
    cssRuleString,
    (index || index === 0) && [...sheet.cssRules].length > 0
      ? index
      : [...sheet.cssRules].length,
  );
  return ruleName;
}

function findPositionInSheet(sheet: CssSheet, cssRuleString: string): boolean {
  return [...sheet.cssRules].some(({ cssText }) => cssText === cssRuleString);
}
