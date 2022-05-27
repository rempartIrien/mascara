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

// FIXME: This is for React only. Move it to another package.
export default function styled<T, P>(
  elementConstructor: FunctionComponent<P> | ComponentClass<P> | string,
  styleProperties: CSS.Properties,
): ForwardRefExoticComponent<
  PropsWithoutRef<P & CommonProperties> & RefAttributes<T>
> {
  const forwardedFactory = forwardRef<T, P & CommonProperties>(
    ({ css: instanceRules, ...props }, ref) => {
      // Insert global and specific CSS rules after inheritors' own rules.
      // We insert class styles at index 0. When an inner class is instanciated
      // the instance insert its style at position 0 and the outer component get
      // its rules pushed at higher positions.
      const cssClassName = css(styleProperties, 0);
      // Insert instance styles at index 1 so that there are after the class
      // rules. They will be pushed by inner class rules (inserted at position
      // 1 too) ; alos, they will stay after corresponding class rules (because
      // inserted after) and so after inner class rules.
      const specificClassName = instanceRules ? css(instanceRules, 1) : "";

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
