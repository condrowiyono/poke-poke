import { ReactNode } from "react";

export type ElementProps = {
  path: string;
  element?: ReactNode;
  children?: ElementProps[];
};

const Route = ({}: ElementProps) => {
  return <></>;
};

export default Route;
