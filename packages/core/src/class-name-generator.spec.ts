import generateCssClassName from "./class-name-generator";
import { Properties } from "./css-types";

describe("Class name generator", () => {
  it("should exist", () => {
    expect(generateCssClassName).toBeDefined();
  });

  it("should return a string", () => {
    const result = generateCssClassName({});
    expect(typeof result === "string").toBeTruthy();
  });

  it("should be deterministic", () => {
    const foo: { style: Properties; expected: string }[] = [
      {
        style: {
          color: "red",
          display: "flex",
        },
        expected: "ongrgh",
      },
      {
        style: {
          color: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "auto",
          padding: 0,
          border: "1px solid red",
          backgroundColor: "ButtonShadow",
          backgroundOrigin: "0 0",
          transform: "translate(-50%, -50%)",
          transition: "padding ease 1s",
          width: "100vh",
          fontSize: "23rem",
          cursor: "move",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "break-spaces",
          wordBreak: "break-all",
          listStyle: "none",
          userSelect: "auto",
          textDecoration: "underline",
          gap: 0,
        },
        expected: "-829u26",
      },
      {
        style: {
          color: "red",
          display: "flex",
        },
        expected: "ongrgh",
      },
      {
        style: {
          color: "blue",
          display: "flex",
        },
        expected: "-80vulk",
      },
    ];

    foo.forEach(({ style, expected }) => {
      const result = generateCssClassName(style);
      expect(result).toBe(expected);
    });
  });
});
