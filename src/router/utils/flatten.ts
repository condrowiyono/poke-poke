import { RouterObject } from "..";

const flatten = (router: RouterObject[], parentPath = ""): RouterObject[] => {
  return router.reduce<RouterObject[]>((acc, route) => {
    const path = `${parentPath}${route.path}`;
    const element = route.element;
    const children = route.children ? flatten(route.children, path) : [];

    return [...acc, { path, element }, ...children];
  }, []);
};

export default flatten;
