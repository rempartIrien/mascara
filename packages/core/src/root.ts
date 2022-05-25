interface CssRoot {
  sheet: CssSheet;
  reset: () => void;
}

interface CssSheet {
  readonly cssRules: CSSRuleList;
  readonly ownerRule: null;
  deleteRule(index: number): void;
  insertRule(cssText: string, index?: number): number;
}

interface CSSRuleList {
  [Symbol.iterator](): IterableIterator<CSSRule>;
}

interface CSSRule {
  cssText: string;
}

function isIndexValid(index?: number): index is number {
  return !!(
    (index === 0 || index) &&
    index <= (ssrRoot.sheet.cssRules as CSSRule[]).length &&
    index > -1
  );
}

const ssrRoot: CssRoot = {
  sheet: {
    cssRules: [],
    ownerRule: null,
    deleteRule(index: number): void {
      if (isIndexValid(index)) {
        (ssrRoot.sheet.cssRules as CSSRule[]).splice(index, 1);
      }
    },
    insertRule(cssText: string, index?: number): number {
      if (isIndexValid(index)) {
        (ssrRoot.sheet.cssRules as CSSRule[]).splice(index, 0, { cssText });
        return index;
      } else {
        (ssrRoot.sheet.cssRules as CSSRule[]).splice(0, 0, { cssText });
        return 0;
      }
    },
  },
  reset: () => {
    (ssrRoot.sheet.cssRules as CSSRule[]).splice(
      0,
      (ssrRoot.sheet.cssRules as CSSRule[]).length,
    );
  },
};

const styleElementId = "data-mascara";
let node: HTMLStyleElement;

//TODO:
const browserReset: CssRoot["reset"] = () => {
  let index = node.sheet?.cssRules.length;
  while (index) {
    node.sheet?.deleteRule(--index);
  }
};

export default function getRoot(): CssRoot {
  if (globalThis.document) {
    // Browser
    const existingNode =
      node ||
      globalThis.document.querySelector<HTMLStyleElement>(
        `style[${styleElementId}]`,
      );
    if (existingNode) {
      return { sheet: existingNode.sheet as CssSheet, reset: browserReset };
    } else {
      node = globalThis.document.createElement("style");
      node.setAttribute(styleElementId, "");
      globalThis.document.head.appendChild(node);
      return { sheet: node.sheet as CssSheet, reset: browserReset };
    }
  } else {
    // SSR
    return ssrRoot;
  }
}
