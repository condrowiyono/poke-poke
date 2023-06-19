import RouterProvider, { Context } from "./context";

import Link from "./components/Link";
import Route from "./components/Route";

import useLocation from "./hooks/useLocation";
import useHistory from "./hooks/useHistory";
import useNavigate from "./hooks/useNavigate";
import useUrlState from "./hooks/useUrlState";
import useParams from "./hooks/useParams";

import type { ElementProps as RouterObject } from "./components/Route";

export {
  RouterProvider,
  Context,
  Link,
  Route,
  useLocation,
  useHistory,
  useNavigate,
  useUrlState,
  useParams,
};

export type { RouterObject };
