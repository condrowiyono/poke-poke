import { FormEvent, useRef, UIEvent, useEffect } from "react";
import { Link, useHistory, useUrlState } from "../../router";
import { gql, useQuery } from "@apollo/client";
import { addLeadingZero, formatList } from "../../utils/format";

import "./style.scss";

type PokemonParams = {
  name?: string;
  type?: string;
};

const getPokemons = ({ type, name }: PokemonParams) => {
  return gql`
    query Pokemon($offset: Int, $limit: Int, $name: String, $type: String) {
      data: pokemon_v2_pokemon(
        offset: $offset
        limit: $limit
        where: {
          ${name ? `name: { _ilike: $name }` : ""}
          ${
            type
              ? `pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _like: $type } }}`
              : ""
          }
        }
      ) {
        name
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;
};

const GET_TYPES = gql`
  query PokemonType {
    data: pokemon_v2_type(order_by: { id: asc }) {
      name
      id
    }
  }
`;

type Response<T> = {
  data: T;
};

type PokemonType = {
  id: number;
  name: string;
};

type Pokemon = {
  name: string;
  id: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: PokemonType;
  }[];
};

const Skeleton = () => {
  return (
    <a className="pokemon">
      <div className="pokemon-meta" />
      <div style={{ height: 120 }} />
    </a>
  );
};

const Pokemon = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [params, setParams] = useUrlState<PokemonParams>({
    name: "",
    type: "",
  });

  const {
    data: pokemons,
    loading,
    fetchMore,
  } = useQuery<Response<Pokemon[]>>(getPokemons(params), {
    variables: {
      ...params,
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: types } = useQuery<Response<PokemonType[]>>(GET_TYPES);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formParams: PokemonParams = Object.fromEntries(formData.entries());
    setParams(formParams);
  };

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        offset: pokemons.data.length,
        limit: 10,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          data: [...prev.data, ...fetchMoreResult.data],
        };
      },
    });
  };

  return (
    <>
      <h1>Pokemon</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => history.back()}>Back</button>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <fieldset>
        <legend>Filter</legend>
        <form style={{ display: "flex", gap: 12 }} onSubmit={handleSubmit}>
          <label>Name</label>
          <input defaultValue={params.name} name="name" />

          <label>Type</label>
          <select
            name="type"
            value={params.type}
            onChange={(e) => setParams({ type: e.currentTarget.value })}
          >
            <option value="">Select a type</option>
            {types?.data.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <button type="submit">Cari</button>
          <button type="reset" onClick={() => setParams(undefined)}>
            Reset
          </button>
        </form>
      </fieldset>
      <div className="container" ref={containerRef}>
        {pokemons?.data.map((pokemon) => (
          <a
            key={pokemon.id}
            className="pokemon"
            style={{
              backgroundColor: `var(--elm-${pokemon.pokemon_v2_pokemontypes?.[0].pokemon_v2_type.name})`,
            }}
          >
            <div className="pokemon-meta">
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-type">
                {formatList(
                  pokemon.pokemon_v2_pokemontypes.map(
                    (type) => type.pokemon_v2_type.name
                  )
                )}
              </div>
              <div className="pokemon-number">
                <span>{addLeadingZero(pokemon.id)}</span>
              </div>
            </div>
            <img
              alt={pokemon.name}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${addLeadingZero(
                pokemon.id
              )}.png`}
            />
          </a>
        ))}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
      </div>
      <div className="footer">
        <button onClick={() => handleFetchMore()}>Load More</button>
      </div>
    </>
  );
};

export default Pokemon;
