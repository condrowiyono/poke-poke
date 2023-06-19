import { Link } from "../router";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/about">About</Link>
        <Link to="/pokemon">Pokemon</Link>
      </div>
      <h2>Table of Content</h2>
      <ul>
        <li>
          <a href="#bulbasaur">Bulbasaur</a>
        </li>
        <li>
          <a href="#ivysaur">Ivysaur</a>
        </li>
      </ul>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
        Quisquam voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
      </div>
      <h2 id="bulbasaur">Bulbasaur</h2>

      <img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
        alt="Bulbasaur"
      />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
        Quisquam voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
      </div>

      <h2 id="ivysaur">Ivysaur</h2>
      <img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png"
        alt="ivysaur"
      />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
        Quisquam voluptatum, quibusdam, quia, quae voluptatem voluptas quod quos
        voluptates quidem doloribus quas. Quisquam voluptatum, quibusdam, quia,
        quae voluptatem voluptas quod quos voluptates quidem doloribus quas.
      </div>
    </div>
  );
};

export default Home;
