const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,flags,region,cca3,population,translations`);
    if (!response.ok) throw new Error("Erreur lors du chargement des pays");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error("Pays non trouvé");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};