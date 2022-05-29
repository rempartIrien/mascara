import CSS, { css } from "@mascara/core";
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

const MASCARA_DISPLAY_NAME = "MascaraForwarded";

type CommonProperties = PropsWithChildren<{
  className?: string;
  css?: CSS.Properties;
}>;

export default function styled<T, P>(
  elementConstructor: FunctionComponent<P> | ComponentClass<P> | string,
  styleProperties: CSS.Properties,
): ForwardRefExoticComponent<
  PropsWithoutRef<P & CommonProperties> & RefAttributes<T>
> {
  const cssClassName = css(styleProperties);
  const forwardedFactory = forwardRef<T, P & CommonProperties>(
    ({ css: instanceRules, ...props }, ref) => {
      const specificClassName = instanceRules
        ? css(instanceRules, { prefix: cssClassName })
        : "";

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
