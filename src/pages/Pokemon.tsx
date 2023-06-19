import { FormEvent, useRef } from "react";
import { Link, useHistory, useNavigate, useUrlState } from "../router";

enum PokemonType {
  Undefined = "",
  Fire = "🔥",
  Water = "💧",
  Grass = "🌿",
  Electric = "⚡️",
}

type PokemonParams = {
  name?: string;
  type?: PokemonType;
};

const Pokemon = () => {
  const [params, setParams] = useUrlState<PokemonParams>({
    name: "",
    type: PokemonType.Undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formParams: PokemonParams = Object.fromEntries(formData.entries());
    setParams(formParams);
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
        <legend>Uncontrolled Form Params</legend>
        <form
          style={{ display: "flex", gap: 12 }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            // value={params.name}
            // onChange={(e) => setParams({ name: e.currentTarget.value.trim() })}
          />

          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            // value={params.type}
            // onChange={(e) => setParams({ type: e.currentTarget.value })}
          >
            <option value={PokemonType.Undefined}>Select a type</option>
            <option value={PokemonType.Fire}>Fire</option>
            <option value={PokemonType.Water}>Water</option>
            <option value={PokemonType.Grass}>Grass</option>
          </select>

          <button type="submit">Cari</button>
          <button onClick={() => setParams(undefined)}>Reset</button>
        </form>
      </fieldset>
      <fieldset>
        <legend>Controlled Form Params</legend>
        <form style={{ display: "flex", gap: 12 }}>
          <label>Name</label>
          <input
            value={params.name}
            onChange={(e) => setParams({ name: e.currentTarget.value.trim() })}
          />

          <label>Type</label>
          <select
            value={params.type}
            onChange={(e) => setParams({ type: e.currentTarget.value })}
          >
            <option value={PokemonType.Undefined}>Select a type</option>
            <option value={PokemonType.Fire}>Fire</option>
            <option value={PokemonType.Water}>Water</option>
            <option value={PokemonType.Grass}>Grass</option>
          </select>

          <button onClick={() => setParams(undefined)}>Reset</button>
        </form>
      </fieldset>
      <div>
        <code>{JSON.stringify(params, null, 4)}</code>
      </div>
    </>
  );
};

export default Pokemon;
