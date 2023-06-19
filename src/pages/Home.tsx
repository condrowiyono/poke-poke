import { Link } from "../router";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/about">About</Link>
        <Link to="/pokemon">Pokemon</Link>
      </div>
    </div>
  );
};

export default Home;
