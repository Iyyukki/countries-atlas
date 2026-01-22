import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryByCode } from "../services/api";

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getCountryByCode(code).then((data) => {
      setCountry(data);
      setLoading(false);
      
      const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const exists = currentFavorites.some((c) => c.cca3 === data.cca3);
      setIsFavorite(exists);
    });
  }, [code]);

  const toggleFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!isFavorite) {
      const newFav = { 
        cca3: country.cca3, 
        name: { common: country.name.common }, 
        translations: country.translations,
        flags: { svg: country.flags.svg },
        region: country.region 
      };
      localStorage.setItem("favorites", JSON.stringify([...currentFavorites, newFav]));
      setIsFavorite(true);
    } else {
      const newFavs = currentFavorites.filter((c) => c.cca3 !== country.cca3);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      setIsFavorite(false);
    }
  };

  if (loading) return <p style={{textAlign: "center", marginTop: "50px"}}>Chargement...</p>;
  if (!country) return <p style={{textAlign: "center", marginTop: "50px"}}>Pays introuvable.</p>;

  const regionsFr = {
    Africa: "Afrique",
    Americas: "Amériques",
    Asia: "Asie",
    Europe: "Europe",
    Oceania: "Océanie",
    Antarctic: "Antarctique"
  };

  const nameFr = country.translations?.fra?.common || country.name.common;
  const regionFr = regionsFr[country.region] || country.region;

  return (
    <div className="detail-container">
      <div style={{ textAlign: "left", width: "100%" }}>
        <button onClick={() => window.history.back()} className="btn-back">
          ← Retour
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <img 
            src={country.flags.svg} 
            alt={nameFr} 
            style={{ width: "100%", maxWidth: "400px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }} 
        />
        
        <h1 style={{ color: "var(--primary)", fontSize: "2.5rem", margin: "10px 0" }}>{nameFr}</h1>
        
        <div style={{ textAlign: "left", background: "#f8f9fa", padding: "20px", borderRadius: "10px", width: "100%", maxWidth: "500px" }}>
          <p><strong>🏛️ Capitale :</strong> {country.capital ? country.capital[0] : "N/A"}</p>
          <p><strong>👥 Population :</strong> {country.population.toLocaleString()}</p>
          <p><strong>🌍 Région :</strong> {regionFr}</p>
          <p><strong>🗣️ Langues :</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
        </div>

        <button 
          onClick={toggleFavorite} 
          className={`btn-fav ${isFavorite ? "added" : ""}`}
        >
          {isFavorite ? (
            <>✅ Ajouté aux favoris</>
          ) : (
            <>❤️ Ajouter aux favoris</>
          )}
        </button>
      </div>
    </div>
  );
}

export default CountryDetail;