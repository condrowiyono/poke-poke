import { RouterObject } from "..";

/**
 * The flatten function is used to convert a nested structure of RouterObject into a flat array.
 * Indonesian: Fungsi flatten digunakan untuk mengubah struktur RouterObject yang bersarang menjadi satu array flat dengan teknik recursive.
 *
 * @param router - Array of RouterObjects to be flattened.
 * @param parentPath - Parent path to be used as a prefix for each child path.
 * @returns Array of flattened RouterObjects.
 * @example
 * const router = [
 *   {
 *     path: "/",
 *     element: <Home />,
 *     children: [
 *       {
 *         path: "about",
 *         element: <About />,
 *       }
 *     ],
 *   },
 * ];
 * const flattenedRouter = flatten(router);
 * console.log(flattenedRouter);
 * // [
 * //   { path: "/", element: <Home /> },
 * //   { path: "/about", element: <About /> },
 * // ]
 */
const flatten = (router: RouterObject[], parentPath = ""): RouterObject[] => {
  return router.reduce<RouterObject[]>((acc, route) => {
    const path = `${parentPath}${route.path}`;
    const element = route.element;
    const children = route.children ? flatten(route.children, path) : [];

    return [...acc, { path, element }, ...children];
  }, []);
};

export default flatten;
