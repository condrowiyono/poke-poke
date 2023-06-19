import { Link, useNavigate } from "../router";

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default About;
