import generateCssClassName from "./class-name-generator";
import generateCssRuleString from "./css-rule-generator";
import { Properties } from "./css-types";
import getRoot, { CssSheet } from "./root";

export function css(styleProperties: Properties): string {
  return innerCss(styleProperties).ruleName;
}

export function innerCss(
  styleProperties: Properties,
  index?: number,
): { ruleName: string; insertPosition: number } {
  const ruleName = generateCssClassName(styleProperties);
  const cssRuleString: string = generateCssRuleString(
    ruleName,
    styleProperties,
  );
  const { sheet } = getRoot();
  const alreadyThere = findPositionInSheet(sheet, cssRuleString);
  if (alreadyThere > -1) {
    return { ruleName, insertPosition: alreadyThere };
  }
  const insertPosition = sheet.insertRule(
    cssRuleString,
    (index || index === 0) && [...sheet.cssRules].length > 0
      ? index
      : [...sheet.cssRules].length,
  );

  return { ruleName, insertPosition };
}

function findPositionInSheet(sheet: CssSheet, cssRuleString: string): number {
  const insertPosition: number = [...sheet.cssRules].findIndex(
    ({ cssText }) => cssText === cssRuleString,
  );
  return insertPosition;
}
