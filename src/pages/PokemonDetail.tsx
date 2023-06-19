import { useUrlState, useParams } from "../router";

type PokemonDetailParams = {
  name: string;
};

const PokemonDetail = () => {
  const { name } = useParams<PokemonDetailParams>();
  const [search, setSearch] = useUrlState({ search: "" });

  return (
    <>
      <div>Pokemon Detail: {name}</div>
      <input
        value={search.search}
        onChange={(e) => setSearch({ search: e.currentTarget.value })}
      />
    </>
  );
};

export default PokemonDetail;
