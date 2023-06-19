import { ReactNode, MouseEvent, useContext } from "react";
import { Context } from "../context";

type LinkType = {
  to: string | URL;
  children: ReactNode;
};

const Link = ({ to, children }: LinkType) => {
  const href = typeof to === "string" ? to : to.href;
  const [, setRoute] = useContext(Context);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const url = new URL(e.currentTarget.href);

    setRoute(url);
    window.history.pushState({}, "", url);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
