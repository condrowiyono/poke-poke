import { useLocation } from "..";
import { useContext } from "react";
import { Context } from "../context";

const useParams = <T extends Record<string, string>>() => {
  const location = useLocation();
  const matchedPath = useContext(Context).matchedPath;

  const pathSegments = matchedPath?.split("/") ?? [];
  const locationSegments = location.pathname.split("/");

  const params = pathSegments.reduce<T>((acc, curr, index) => {
    if (curr.startsWith(":")) {
      const key = curr.slice(1);
      return { ...acc, [key]: decodeURI(locationSegments[index]) };
    }

    return acc;
  }, {} as T);

  return params;
};

export default useParams;
