import { Link } from "react-router-dom";

function CountryCard({ country }) {
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
    <div className="country-card">
      <img src={country.flags.svg} alt={nameFr} />
      <div className="card-body">
        <h3 className="card-title">{nameFr}</h3>
        <p>🌍 {regionFr}</p>
        <Link to={`/country/${country.cca3}`} className="btn btn-primary">
          Voir détails
        </Link>
      </div>
    </div>
  );
}

export default CountryCard;