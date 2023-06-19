import React, { useState, useEffect, ReactElement, Children } from "react";
import { ElementProps } from "../components/Route";

type ContextType = [URL, React.Dispatch<React.SetStateAction<URL>>];
const Context = React.createContext<ContextType>([
  new URL(window.location.href),
  () => {},
]);

type RouterProviderProps = {
  router?: ElementProps[];
  /**
   * Will be used only if router is not provided
   */
  children?: ReactElement<ElementProps>[];
};

const RouterProvider = ({ router, children }: RouterProviderProps) => {
  const [route, setRoute] = useState(new URL(window.location.href));

  const routes = router
    ? router
    : Children.map(children, (child) => {
        return {
          path: child.props.path,
          element: child.props.element,
        };
      });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(new URL(window.location.pathname, window.location.href));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const routeMatch = routes.find((r) => route.pathname === r.path);
  const element = routeMatch ? routeMatch.element : <div>Not Found</div>;

  return (
    <Context.Provider value={[route, setRoute]}>{element}</Context.Provider>
  );
};

export { Context };
export default RouterProvider;
