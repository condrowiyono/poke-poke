import { ReactNode, MouseEvent, useContext } from "react";
import { Context } from "../context";

type LinkType = {
  to: string;
  children: ReactNode;
};

const Link = ({ to, children }: LinkType) => {
  const [, setRoute] = useContext(Context);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setRoute(to);
    window.history.pushState({}, "", to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
