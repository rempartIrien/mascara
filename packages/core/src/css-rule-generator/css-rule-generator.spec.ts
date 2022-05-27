import CSS from "../css-types";

import generateCssRuleString from "./css-rule-generator";

describe("generateCssRuleString", () => {
  it("sould exist", () => {
    expect(generateCssRuleString).toBeDefined();
  });

  it("should generate a string", () => {
    const result = generateCssRuleString("", {});
    expect(typeof result === "string").toBeTruthy();
  });

  it("should generate a CSS rule based on the given rule name", () => {
    const ruleName = ".foo";
    const result = generateCssRuleString(ruleName, {});
    expect(result).toMatch(new RegExp(`^${ruleName} \\{  \\}$`));
  });

  it("should generate a CSS rule based on the given CSS properties", () => {
    const ruleName = ".foo";
    const styleProperties: CSS.Properties = {
      fontSize: "12px",
      color: "red",
      margin: 0,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      WebkitAlignItems: "normal",
    };
    const result = generateCssRuleString(ruleName, styleProperties);
    expect(result).toMatch(
      new RegExp(
        `^${ruleName} \\{ font-size: 12px; color: red; margin: 0; -webkit-align-items: normal; \\}$`,
      ),
    );
  });
});
