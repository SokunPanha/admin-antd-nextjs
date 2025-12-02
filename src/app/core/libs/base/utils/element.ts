import { createElement, type FC, type ReactNode } from "react";

export const createPage = (...children: any[]) => {
  const PageWrapper: FC<{ children?: ReactNode }> = ({ children: defaultChildren, ...otherProps }) => {
    return children.reduceRight((prev, curr) => createElement(curr, otherProps, prev), defaultChildren);
  };
  return PageWrapper;
};


