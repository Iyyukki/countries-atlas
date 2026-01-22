import { useEffect, useState } from "react";
import { getAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [region, setRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = countries;

    if (region !== "All") {
      result = result.filter((c) => c.region === region);
    }

    if (search) {
      result = result.filter((c) => {
        const nameFr = c.translations?.fra?.common || "";
        const nameEn = c.name.common || "";
        const searchLower = search.toLowerCase();
        
        // Recherche sur le nom FR ou EN
        return nameFr.toLowerCase().includes(searchLower) || nameEn.toLowerCase().includes(searchLower);
      });
    }

    setFilteredCountries(result);
  }, [search, region, countries]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Chargement des pays...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</p>;

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "var(--primary)", margin: "40px 0" }}>Explorateur de Pays</h1>
      
      <div className="filters-container">
        <input 
          type="text" 
          placeholder="🔍 Rechercher un pays..." 
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select 
          className="filter-select"
          onChange={(e) => setRegion(e.target.value)} 
          value={region}
        >
          <option value="All">Tous les continents</option>
          <option value="Africa">Afrique</option>
          <option value="Americas">Amériques</option>
          <option value="Asia">Asie</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Océanie</option>
        </select>
      </div>

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
            Aucun pays ne correspond à votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;