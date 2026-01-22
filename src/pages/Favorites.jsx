import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  const removeFavorite = (cca3) => {
    // Suppression directe sans confirmation
    const newFavs = favorites.filter((c) => c.cca3 !== cca3);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const clearAllFavorites = () => {
    // Suppression totale directe sans confirmation
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "var(--primary)", margin: "40px 0 10px 0" }}>
        Mes Favoris ❤️
      </h1>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
        <span style={{ color: "#666", fontSize: "1.1rem" }}>
          <strong>{favorites.length}</strong> pays sauvegardé(s)
        </span>
        
        {favorites.length > 0 && (
          <button 
            onClick={clearAllFavorites}
            style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            🗑️ Tout supprimer
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <p style={{ fontSize: "1.3rem", color: "#888", marginBottom: "20px" }}>Votre liste est vide.</p>
          
          <Link to="/" className="btn-explore">
            🌍 Explorer les pays
          </Link>
          
        </div>
      ) : (
        <div className="countries-grid">
          {favorites.map((country) => (
            <div key={country.cca3} className="favorite-wrapper">
              <CountryCard country={country} />
              <button 
                className="btn-remove"
                onClick={() => removeFavorite(country.cca3)}
                title="Supprimer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;