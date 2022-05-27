import generateCssClassName from "./class-name-generator";
import generateCssRuleString from "./css-rule-generator";
import CSS from "./css-types";
import getRoot, { CssSheet } from "./root";

export default function css(
  styleProperties: CSS.Properties,
  index?: number,
): string {
  const ruleName = generateCssClassName(styleProperties);
  const cssRuleString: string = generateCssRuleString(
    ruleName,
    styleProperties,
  );
  const { sheet } = getRoot();
  const alreadyThere = findPositionInSheet(sheet, cssRuleString);
  if (alreadyThere) {
    return ruleName;
  }
  const i = sheet.insertRule(
    cssRuleString,
    (index || index === 0) && [...sheet.cssRules].length > 0
      ? index
      : [...sheet.cssRules].length,
  );
  console.log("insert", cssRuleString, "at position", index, "real index", i);
  return ruleName;
}

function findPositionInSheet(sheet: CssSheet, cssRuleString: string): boolean {
  return [...sheet.cssRules].some(({ cssText }) => cssText === cssRuleString);
}
