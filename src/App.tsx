import About from "./pages/About";
import Home from "./pages/Home";
import { RouterProvider, Route } from "./router";

const App = () => {
  return (
    <RouterProvider>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </RouterProvider>
  );
};

export default App;
