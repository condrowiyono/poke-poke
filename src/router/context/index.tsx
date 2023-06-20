import React, {
  useState,
  useEffect,
  ReactElement,
  Children,
  useMemo,
} from "react";
import { ElementProps } from "../components/Route";
import flatten from "../utils/flatten";

type ContextType = {
  state: [URL, React.Dispatch<React.SetStateAction<URL>>];
  matchedPath: string;
};

const Context = React.createContext<ContextType>({
  state: [new URL(window.location.href), () => {}],
  matchedPath: "",
});

type RouterProviderProps = {
  router?: ElementProps[];
  /**
   * Will be used only if router is not provided
   */
  children?: ReactElement<ElementProps>[];
};

const RouterProvider = ({ router, children }: RouterProviderProps) => {
  const [route, setRoute] = useState(new URL(window.location.href));
  useEffect(() => {
    const handlePopState = () => {
      setRoute(new URL(window.location.pathname, window.location.href));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const routes = useMemo(() => {
    const routeComponent = router
      ? router
      : Children.map(children, ({ props }) => ({
          path: props.path,
          element: props.element,
          children: props.children,
        }));

    return flatten(routeComponent);
  }, [router, children]);

  const routeMatch = routes.find((r) => {
    const pathSegments = r.path.split("/"); // Split the path into segments
    const routeSegments = route.pathname.split("/");

    return (
      pathSegments.length === routeSegments.length &&
      pathSegments.every(
        (segment, index) =>
          segment === routeSegments[index] || segment.startsWith(":")
      )
    );
  });

  const element = routeMatch ? routeMatch.element : <div>Not Found</div>;

  return (
    <Context.Provider
      value={{
        state: [route, setRoute],
        matchedPath: routeMatch ? routeMatch.path : "",
      }}
    >
      {element}
    </Context.Provider>
  );
};

export { Context };
export default RouterProvider;
