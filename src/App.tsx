import About from "./pages/About";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonDetailEvolution from "./pages/PokemonDetailEvolution";

import { RouterProvider, RouterObject } from "./router";

const router: RouterObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/introduction",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pokemon",
    element: <Pokemon />,
    children: [
      {
        path: "/:name",
        element: <PokemonDetail />,
        children: [
          {
            path: "/evolve",
            children: [
              {
                path: "/:evolution",
                element: <PokemonDetailEvolution />,
              },
            ],
          },
          // {
          //   path: "/evolve/:evolution",
          //   children: [
          //     {
          //       path: "",
          //       element: <PokemonDetailEvolution />,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
];

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
