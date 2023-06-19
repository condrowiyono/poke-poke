import { useMemo, useRef } from "react";
import queryString, { ParseOptions, StringifyOptions } from "query-string";
import { useLocation, useNavigate } from "..";

export interface Options {
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}

const baseParseConfig: ParseOptions = {
  parseNumbers: false,
  parseBooleans: false,
};

const baseStringifyConfig: StringifyOptions = {
  skipNull: true,
  skipEmptyString: true,
};

const useUrlState = <T>(initialState?: T | (() => T), options?: Options) => {
  type State = Partial<{ [K in keyof T]: unknown }>;

  const { parseOptions, stringifyOptions } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const location = useLocation();
  const navigate = useNavigate();

  const initialStateRef = useRef(
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState || {}
  );

  const queryFromUrl = useMemo(
    () => queryString.parse(location.search, mergedParseOptions),
    [location.search]
  );

  const targetQuery = useMemo<State>(
    () => ({ ...initialStateRef.current, ...queryFromUrl }),
    [queryFromUrl]
  );

  const setState = (state?: React.SetStateAction<State>) => {
    const location = useLocation();

    if (state === undefined) {
      navigate(location.pathname);
      return;
    }

    const newQuery = typeof state === "function" ? state(targetQuery) : state;
    const query = newQuery
      ? queryString.stringify(
          { ...queryFromUrl, ...newQuery },
          mergedStringifyOptions
        )
      : "";

    const url = new URL(location.href);
    url.search = query;

    navigate(url.toString());
  };

  return [targetQuery as T, setState] as const;
};

export default useUrlState;
