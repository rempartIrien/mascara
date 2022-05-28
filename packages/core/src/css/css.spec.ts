import getRoot from "../root";

import css from "./css";

describe("css", () => {
  it("should exist", () => {
    expect(css).toBeDefined();
  });

  it("should return strings", () => {
    const result = css({});
    expect(typeof result === "string").toBeTruthy();
  });

  it("should add CSS rules to CSS sheet", () => {
    const { sheet } = getRoot();
    expect([...sheet.cssRules].length).toBe(0);
    const ruleName = css({});
    expect([...sheet.cssRules].length).toBe(1);
    expect(
      [...sheet.cssRules].some(({ cssText }) => cssText.includes(ruleName)),
    ).toBeTruthy();
  });

  describe("when the CSS rule already exists", () => {
    it("should not add it once again", () => {
      const { sheet } = getRoot();
      expect([...sheet.cssRules].length).toBe(0);
      const ruleName = css({});
      expect([...sheet.cssRules].length).toBe(1);
      const ruleName2 = css({});
      expect(ruleName2).toBe(ruleName);
      expect(
        [...sheet.cssRules].filter(({ cssText }) => cssText.includes(ruleName))
          .length,
      ).toBe(1);
    });
  });

  it("should add the rule at the end of the CSS sheet", () => {
    const { sheet } = getRoot();
    css({ color: "red" });
    css({ color: "blue" });
    css({ color: "yellow" });
    expect([...sheet.cssRules].length).toBe(3);
    const ruleName4 = css({ color: "green" });
    expect([...sheet.cssRules].length).toBe(4);
    expect(
      [...sheet.cssRules].findIndex(({ cssText }) =>
        cssText.includes(ruleName4),
      ),
    ).toBe(3);
  });

  describe("when an index is given", () => {
    it("should add the rule at this index", () => {
      const { sheet } = getRoot();
      css({ color: "red" });
      css({ color: "blue" });
      css({ color: "yellow" });
      expect([...sheet.cssRules].length).toBe(3);
      const ruleName4 = css({ color: "green" }, 1);
      expect([...sheet.cssRules].length).toBe(4);
      expect(
        [...sheet.cssRules].findIndex(({ cssText }) =>
          cssText.includes(ruleName4),
        ),
      ).toBe(1);
    });
  });

  afterEach(() => {
    const root = getRoot();
    root.reset();
  });
});
