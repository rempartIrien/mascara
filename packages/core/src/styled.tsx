import {
  ComponentClass,
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  createElement,
  forwardRef,
} from "react";

import { innerCss } from "./css";
import { Properties } from "./css-types";

const MASCARA_COUNTER = "data-mascara-counter";
const MASCARA_DISPLAY_NAME = "MascaraForwarded";

type CommonProperties = PropsWithChildren<{
  className?: string;
  css?: Properties;
  [MASCARA_COUNTER]?: number;
}>;

// FIXME: This is for React only. Move it to another package.
export function styled<T, P>(
  elementConstructor: FunctionComponent<P> | ComponentClass<P> | string,
  styleProperties: Properties,
): ForwardRefExoticComponent<
  PropsWithoutRef<P & CommonProperties> & RefAttributes<T>
> {
  const forwardedFactory = forwardRef<T, P & CommonProperties>(
    ({ css: c, ...props }, ref) => {
      // Insert global and specific CSS rules before inheritors' own rules.
      const { ruleName: cssClassName, insertPosition: globalPosition } =
        innerCss(styleProperties, props[MASCARA_COUNTER]);
      const specificClassName = c
        ? innerCss(c, globalPosition + 1).ruleName
        : "";

      const new$$mascaracounter = globalPosition;

      // Compute new className attribute
      const fullCssClasses = specificClassName
        ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${cssClassName} ${specificClassName}`
        : cssClassName;
      const className = props.className
        ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${props.className} ${fullCssClasses}`
        : fullCssClasses;

      // Add current CSS class to className and forward ref
      const newProps = {
        ...props,
        ref,
        className,
        [MASCARA_COUNTER]: new$$mascaracounter,
      } as P & CommonProperties;
      const newElement = createElement(elementConstructor, newProps);
      return newElement;
    },
  );
  const initialDisplayName =
    typeof elementConstructor === "string"
      ? elementConstructor
      : String(elementConstructor.displayName);
  forwardedFactory.displayName = `${MASCARA_DISPLAY_NAME}-${initialDisplayName}`;
  return forwardedFactory;
}
