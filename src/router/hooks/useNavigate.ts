import { useContext } from "react";
import { Context } from "../context";

const useNavigate = () => {
  const [, setRoute] = useContext(Context).state;

  const navigate = (to: string | URL) => {
    const url =
      typeof to === "string" ? new URL(to, window.location.origin) : to;

    setRoute(url);
    window.history.pushState({}, "", url);
  };

  return navigate;
};

export default useNavigate;
