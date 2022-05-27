import generateCssClassName from "./class-name-generator";
import generateCssRuleString from "./css-rule-generator";
import { Properties } from "./css-types";
import getRoot from "./root";

export function css(styleProperties: Properties): string {
  const ruleName = generateCssClassName(styleProperties);
  const cssRuleString: string = generateCssRuleString(
    ruleName,
    styleProperties,
  );
  const { sheet } = getRoot();
  sheet.insertRule(cssRuleString, [...sheet.cssRules].length);

  return ruleName;
}
