/**
 * @jest-environment jsdom
 */
import getRoot from "./root";

describe("getRoot", () => {
  it("should exist", () => {
    expect(getRoot).toBeDefined();
  });

  describe("when in the browser", () => {
    it("should create an empty style element in window document", () => {
      const { sheet } = getRoot();
      const expected: CSSStyleSheet | null | undefined =
        globalThis.document.querySelector("style")?.sheet;
      expect(sheet).toBe(expected);
    });

    it("should expose a reset method", () => {
      const { reset } = getRoot();
      expect(reset).toBeDefined();
    });

    describe("the created CSS sheet", () => {
      it("should be embedded in an empty style element in window document", () => {
        const { sheet } = getRoot();
        const expected: CSSStyleSheet | null | undefined =
          globalThis.document.querySelector<HTMLStyleElement>(
            "style[data-mascara]",
          )?.sheet;
        expect(sheet).toBe(expected);
      });

      it("should be reused", () => {
        const { sheet } = getRoot();
        const expected: CSSStyleSheet | null | undefined =
          globalThis.document.querySelector<HTMLStyleElement>(
            "style[data-mascara]",
          )?.sheet;
        expect(sheet).toBe(expected);

        const { sheet: sheet2 } = getRoot();
        expect(sheet2).toBe(expected);
        expect(sheet2).toBe(sheet);
      });
    });

    describe("the reset method", () => {
      it("should empty the CSS rules collection of the created CSS sheet", () => {
        const { sheet, reset } = getRoot();
        const { cssRules } = sheet;

        const newCssRule = ".foo, .bar { color: red; }";
        sheet.insertRule(newCssRule);

        expect([...cssRules].length).toBe(1);

        reset();

        expect([...cssRules].length).toBe(0);
      });
    });
  });

  afterEach(() => {
    const { reset } = getRoot();
    reset();
  });
});
