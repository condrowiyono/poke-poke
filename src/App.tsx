import About from "./pages/About";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import { RouterProvider, Route } from "./router";

const App = () => {
  return (
    <RouterProvider>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pokemon" element={<Pokemon />} />
    </RouterProvider>
  );
};

export default App;
