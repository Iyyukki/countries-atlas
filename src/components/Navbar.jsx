import { Link } from "react-router-dom";
import "../App.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        🗺️ Atlas
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" className="nav-link">
          🏠 Accueil
        </Link>
        <Link to="/favorites" className="nav-link">
          ❤️ Favoris
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;