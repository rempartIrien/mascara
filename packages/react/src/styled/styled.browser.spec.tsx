/**
 * @jest-environment jsdom
 */
import { cleanup, render } from "@testing-library/react";
import { ReactElement } from "react";

import styled from "./styled";

describe("styled", () => {
  it("sould exist", () => {
    expect(styled).toBeDefined();
  });

  it("should create constructor for component with style", () => {
    const Red = styled("div", { color: "red" });
    const Blue = styled("div", { color: "blue" });
    render(<Red>red</Red>);
    const { getByText } = render(<Blue>blue</Blue>);

    const red = getByText("red");
    const blue = getByText("blue");
    expect(red).toBeDefined();
    expect(blue).toBeDefined();
    expect(getComputedStyle(red).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(blue).getPropertyValue("color")).toBe("blue");
  });

  it("should create constructor for component with no inline style", () => {
    const Red = styled("div", { color: "red" });
    const Blue = styled("div", { color: "blue" });
    render(<Red>red</Red>);
    const { getByText } = render(<Blue>blue</Blue>);

    const red = getByText("red");
    const blue = getByText("blue");
    expect(red.getAttribute("style")).toBeFalsy();
    expect(blue.getAttribute("style")).toBeFalsy();
  });

  it("should create constructor for component with HTML tag as base component", () => {
    const Red = styled("div", { color: "red" });
    const Blue = styled("button", { color: "blue" });
    render(<Red>red</Red>);
    const { getByText } = render(<Blue>blue</Blue>);

    const red = getByText("red");
    const blue = getByText("blue");
    expect(red.nodeName).toBe("DIV");
    expect(blue.nodeName).toBe("BUTTON");
  });

  it("should create constructor for component with styled component as base component", () => {
    const Red = styled("div", { color: "red" });
    const RedFontSize = styled(Red, { fontSize: "32px" });
    render(<Red>red</Red>);
    const { getByText } = render(<RedFontSize>redFontSize</RedFontSize>);

    const red = getByText("red");
    const redFontSize = getByText("redFontSize");
    expect(red.nodeName).toBe("DIV");
    expect(redFontSize.nodeName).toBe("DIV");
    expect(getComputedStyle(red).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(redFontSize).getPropertyValue("font-size")).toBe(
      "32px",
    );
  });

  it("should create constructor for component with React component as base component", () => {
    const Div = (props: Record<string, unknown>): ReactElement => (
      <div {...props} />
    );
    const Red = styled(
      (props: Record<string, unknown>): ReactElement => <Div {...props} />,
      { color: "red" },
    );
    const RedFontSize = styled(Red, { fontSize: "32px" });
    render(<Red>red</Red>);
    const { getByText } = render(<RedFontSize>redFontSize</RedFontSize>);

    const red = getByText("red");
    const redFontSize = getByText("redFontSize");
    expect(red.nodeName).toBe("DIV");
    expect(redFontSize.nodeName).toBe("DIV");
    expect(getComputedStyle(red).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(redFontSize).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(redFontSize).getPropertyValue("font-size")).toBe(
      "32px",
    );
  });

  it("should create constructor for component with `css` prop", () => {
    const Div = styled("div", {});
    const Red = styled(
      (props: Record<string, unknown>): ReactElement => (
        <Div css={{ textTransform: "capitalize" }} {...props} />
      ),
      { color: "red" },
    );
    const RedFontSize = styled(Red, { fontSize: "32px" });
    render(<Red>red</Red>);
    const { getByText } = render(
      <RedFontSize css={{ textDecoration: "underline" }}>
        redFontSize
      </RedFontSize>,
    );

    const red = getByText("red");
    const redFontSize = getByText("redFontSize");
    expect(red.nodeName).toBe("DIV");
    expect(redFontSize.nodeName).toBe("DIV");
    expect(getComputedStyle(red).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(red).getPropertyValue("text-transform")).toBe(
      "capitalize",
    );
    expect(getComputedStyle(red).getPropertyValue("color")).toBe("red");
    expect(getComputedStyle(redFontSize).getPropertyValue("font-size")).toBe(
      "32px",
    );
    expect(
      getComputedStyle(redFontSize).getPropertyValue("text-decoration"),
    ).toBe("underline");
    expect(
      getComputedStyle(redFontSize).getPropertyValue("text-transform"),
    ).toBe("capitalize");
  });

  describe("when defining several components", () => {
    it("should order styles properly", () => {
      const One = styled("div", { color: "green" });
      const Two = styled(One, { color: "yellow" });
      const Three = styled(Two, { color: "red" });

      render(<Two>two</Two>);
      render(<Three>three</Three>);
      const { getByText } = render(<One>one</One>);

      expect(getComputedStyle(getByText("one")).getPropertyValue("color")).toBe(
        "green",
      );
      expect(getComputedStyle(getByText("two")).getPropertyValue("color")).toBe(
        "yellow",
      );
      expect(
        getComputedStyle(getByText("three")).getPropertyValue("color"),
      ).toBe("red");
    });

    it("should favor instance styles instead of class styles", () => {
      const One = styled("div", { color: "red" });
      const Two = styled(One, { color: "green" });

      render(<Two>two</Two>);
      const { getByText } = render(
        <Two css={{ color: "blue" }}>twoWithCss</Two>,
      );
      const two = getByText("two");
      const twoWithCss = getByText("twoWithCss");
      expect(getComputedStyle(two).getPropertyValue("color")).toBe("green");
      expect(getComputedStyle(twoWithCss).getPropertyValue("color")).toBe(
        "blue",
      );
    });

    it("cannot work properly when used with a constructor giving instance styles", () => {
      const One = styled("div", { color: "red" });
      const Two = styled(
        (props) => <One css={{ color: "yellow" }} {...props} />,
        { color: "green" },
      );

      render(<Two>two</Two>);
      const { getByText } = render(
        <Two css={{ color: "blue" }}>twoWithCss</Two>,
      );
      const two = getByText("two");
      const twoWithCss = getByText("twoWithCss");
      expect(getComputedStyle(two).getPropertyValue("color")).toBe("yellow");
      expect(getComputedStyle(twoWithCss).getPropertyValue("color")).toBe(
        "yellow",
      );
    });

    it("should favor instance styles even if already declared beforehands", () => {
      const One = styled("div", { color: "red" });
      const Two = styled(One, { color: "green" });

      render(<Two>two</Two>);
      const { getByText } = render(
        <Two css={{ color: "red" }}>twoWithCss</Two>,
      );
      const two = getByText("two");
      const twoWithCss = getByText("twoWithCss");
      expect(getComputedStyle(two).getPropertyValue("color")).toBe("green");
      expect(getComputedStyle(twoWithCss).getPropertyValue("color")).toBe(
        "red",
      );
    });
  });

  afterEach(() => {
    cleanup();
  });
});
