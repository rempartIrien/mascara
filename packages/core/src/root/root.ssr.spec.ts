import getRoot from "./root";

describe("getRoot", () => {
  it("should exist", () => {
    expect(getRoot).toBeDefined();
  });

  describe("when in SSR mode", () => {
    it("should return an object containg a sheet close to native CSSStyleSheet", () => {
      const { sheet } = getRoot();
      const { cssRules, ownerRule } = sheet;
      expect(cssRules).toBeDefined();
      expect(ownerRule).toBeNull();
      expect(sheet.deleteRule).toBeDefined();
      expect(sheet.insertRule).toBeDefined();
    });

    it("should return a reset function", () => {
      const { reset } = getRoot();
      expect(reset).toBeDefined();
    });

    describe("sheet", () => {
      describe("insertRule method", () => {
        it("should insert CSS rules in cssRules collection", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;
          const newCssRule = ".foo, .bar { color: red; }";
          sheet.insertRule(newCssRule);

          expect([...cssRules].length).toBe(1);
          expect(cssRules).toContainEqual({ cssText: newCssRule });

          const newCssRule2 = ".foo, .bar { color: blue; }";
          sheet.insertRule(newCssRule2);

          expect([...cssRules].length).toBe(2);
          expect(cssRules).toContainEqual({ cssText: newCssRule });
          expect(cssRules).toContainEqual({ cssText: newCssRule2 });
        });

        it("should insert CSS rules at index 0 by default", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;
          const newCssRule = ".foo, .bar { color: red; }";
          sheet.insertRule(newCssRule);

          expect([...cssRules].length).toBe(1);
          expect(cssRules).toContainEqual({ cssText: newCssRule });
          expect([...cssRules][0]).toEqual({ cssText: newCssRule });

          const newCssRule2 = ".foo, .bar { color: blue; }";
          sheet.insertRule(newCssRule2);

          expect([...cssRules].length).toBe(2);
          expect(cssRules).toContainEqual({ cssText: newCssRule });
          expect(cssRules).toContainEqual({ cssText: newCssRule2 });
          expect([...cssRules][1]).toEqual({ cssText: newCssRule });
          expect([...cssRules][0]).toEqual({ cssText: newCssRule2 });
        });

        describe("when specifying indices", () => {
          beforeEach(() => {
            const { sheet } = getRoot();
            const newCssRule = ".foo, .bar { color: red; }";
            sheet.insertRule(newCssRule);
            const newCssRule2 = ".foo, .bar { color: blue; }";
            sheet.insertRule(newCssRule2);
          });

          it("should insert CSS rule at given indices", () => {
            const { sheet } = getRoot();
            const { cssRules } = sheet;

            const newCssRule3 = ".foo, .bar { color: green; }";
            sheet.insertRule(newCssRule3, 1);

            expect([...cssRules].length).toBe(3);
            expect([...cssRules][1]).toEqual({ cssText: newCssRule3 });

            const newCssRule4 = ".foo, .bar { color: yellow; }";
            sheet.insertRule(newCssRule4, 2);

            expect([...cssRules].length).toBe(4);
            expect([...cssRules][2]).toEqual({ cssText: newCssRule4 });
          });

          it("should insert CSS rule at the beginning if given indices are bigger than the CSS rule collection size", () => {
            const { sheet } = getRoot();
            const { cssRules } = sheet;

            const newCssRule3 = ".foo, .bar { color: green; }";
            sheet.insertRule(newCssRule3, 999);

            expect([...cssRules].length).toBe(3);
            expect([...cssRules][0]).toEqual({ cssText: newCssRule3 });
          });

          it("should insert CSS rule at the beginning if given indices are smaller than 0", () => {
            const { sheet } = getRoot();
            const { cssRules } = sheet;

            const newCssRule3 = ".foo, .bar { color: green; }";
            sheet.insertRule(newCssRule3, -999);

            expect([...cssRules].length).toBe(3);
            expect([...cssRules][0]).toEqual({ cssText: newCssRule3 });
          });

          it("should insert CSS rule at the beginning of the CSS rule collection is indices equal to 0", () => {
            const { sheet } = getRoot();
            const { cssRules } = sheet;

            const newCssRule3 = ".foo, .bar { color: green; }";
            sheet.insertRule(newCssRule3, 0);

            expect([...cssRules].length).toBe(3);
            expect([...cssRules][0]).toEqual({ cssText: newCssRule3 });
          });
        });
      });

      describe("deleteRule method", () => {
        const newCssRule = ".foo, .bar { color: red; }";
        const newCssRule2 = ".foo, .bar { color: blue; }";

        beforeEach(() => {
          const { sheet } = getRoot();
          sheet.insertRule(newCssRule);
          sheet.insertRule(newCssRule2);
        });

        it("should delete CSS rules from CSS rule collection", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;

          sheet.deleteRule(0);

          expect([...cssRules].length).toBe(1);
          expect(cssRules).toContainEqual({ cssText: newCssRule });

          const newCssRule3 = ".foo, .bar { color: green; }";
          sheet.insertRule(newCssRule3, 1);
          sheet.deleteRule(0);

          expect([...cssRules].length).toBe(1);
          expect(cssRules).toContainEqual({ cssText: newCssRule3 });
        });

        it("should do nothing if the CSS rule collection is empty", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;

          expect([...cssRules].length).toBe(2);
          sheet.deleteRule(1);
          sheet.deleteRule(0);
          expect([...cssRules].length).toBe(0);
          sheet.deleteRule(0);
          expect([...cssRules].length).toBe(0);
        });

        it("should do nothing if given indices are bigger than the CSS rule collection size", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;

          sheet.deleteRule(999);

          expect([...cssRules].length).toBe(2);
        });

        it("should do nothing if goiven indices are smaller than 0", () => {
          const { sheet } = getRoot();
          const { cssRules } = sheet;

          sheet.deleteRule(-1);

          expect([...cssRules].length).toBe(2);
        });
      });
    });

    describe("reset", () => {
      it("should empty the CSS rule list", () => {
        const { sheet, reset } = getRoot();
        const { cssRules } = sheet;

        const newCssRule = ".foo, .bar { color: red; }";
        sheet.insertRule(newCssRule);

        expect([...cssRules].length).toBe(1);
        expect(cssRules).toContainEqual({ cssText: newCssRule });

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
