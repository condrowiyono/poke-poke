import About from "./pages/About";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import { RouterProvider, Route, RouterObject } from "./router";

const router: RouterObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pokemon",
    element: <Pokemon />,
  },
];
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
