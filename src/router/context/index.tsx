import React, { useState, useEffect, Children, ReactElement } from "react";
import { ElementProps } from "../components/Route";

type ContextType = [string, React.Dispatch<React.SetStateAction<string>>];
const Context = React.createContext<ContextType>(["", () => {}]);

type RouterProviderProps = {
  children: ReactElement<ElementProps>[];
};

const RouterProvider = ({ children }: RouterProviderProps) => {
  const [route, setRoute] = useState(window.location.pathname);

  const routes = Children.map(children, (child) => {
    return {
      path: child.props.path,
      element: child.props.element,
    };
  });

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const routeMatch = routes.find((r) => route === r.path);
  const element = routeMatch ? routeMatch.element : <div>Not Found</div>;

  return (
    <Context.Provider value={[route, setRoute]}>{element}</Context.Provider>
  );
};

export { Context };
export default RouterProvider;
