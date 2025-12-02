"use client"
import React, {createContext, useContext} from "react"

// create context and wrap it with useContext hook

 const makeContext = <T, >(hookFunc: () => T): [React.FC<{ children: React.ReactNode }>, () => T] => {
  const ctx = createContext<T | undefined>(undefined);

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = hookFunc();
    return React.createElement(ctx.Provider, { value }, children);
  };

  const useCtx = () => {
    const value = useContext(ctx);
    if (!value) {
      throw new Error("useCtx must be used within Provider");
    }
    return value;
  };

  return [Provider, useCtx];
};
// lit component
 const makeComponent = <T, >(hookFunc: () => T, component: React.FC<T>): [React.FC<T>,() => T] => {
  return [component,hookFunc]
}


export {makeContext, makeComponent}
// const []  = makeContext(()=> {return{key: "value"}})