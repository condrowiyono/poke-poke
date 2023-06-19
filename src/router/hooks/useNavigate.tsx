import { useContext } from "react";
import { Context } from "../context";

const useNavigate = () => {
  const [, setRoute] = useContext(Context);

  const navigate = (to: string) => {
    setRoute(to);
    window.history.pushState({}, "", to);
  };

  return navigate;
};

export default useNavigate;
