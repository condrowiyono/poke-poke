import { useParams } from "../router";

type PokemonDetailParams = {
  name: string;
  evolution: string;
};

const PokemonDetailEvolution = () => {
  const { name, evolution } = useParams<PokemonDetailParams>();

  return (
    <>
      <div>Pokemon Detail: {name}</div>
      <div>Pokemon Evolution: {evolution}</div>
    </>
  );
};

export default PokemonDetailEvolution;
