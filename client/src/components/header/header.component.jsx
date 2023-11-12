import { Link } from "react-router-dom";
import "./header.style.css";

function Header() {
  return (
    <div className="header-container">
      <div>
        <h1 className="logo-header">Videogames-PI</h1>
      </div>
      <div>
        <Link to="/home">
          <button className="header-home">Home</button>
        </Link>
        <Link to="/create">
          <button className="header-create">Creá tu videojuego</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
