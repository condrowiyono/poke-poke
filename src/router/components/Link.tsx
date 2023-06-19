import { ReactNode, MouseEvent, useContext } from "react";
import { Context } from "../context";

type LinkType = {
  to: string | URL;
  children: ReactNode;
};

const Link = ({ to, children }: LinkType) => {
  const href = typeof to === "string" ? to : to.href;
  const [, setRoute] = useContext(Context).state;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // handle hash
    const url = new URL(href, window.location.href);

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
