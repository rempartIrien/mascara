import { styled } from "@mascara/react";
import { ReactElement, ReactNode } from "react";

// const Foo = styled("button", { color: "red" });
// const Bar = styled(Foo, { textDecoration: "underline" });
// const Baz = styled("div", { border: "3px solid blue" });
const One = styled("div", { fontSize: "20px" });
const Two = styled(One, { color: "indigo" });
const Three = styled(Two, { fontWeight: 900 });
const Four = styled<unknown, { children: ReactNode }>(
  (props) => {
    return <Three css={{ color: "yellow" }} {...props} />;
  },
  { color: "red" },
);

// function Test2({ children }: { children: ReactNode }): ReactElement {
//   return <section>{children}</section>;
// }

export default function Test(): ReactElement {
  return (
    <div>
      <Four css={{ color: "green" }}>
        <span>Hello</span>
        <span>World</span>
      </Four>
    </div>
  );
}
