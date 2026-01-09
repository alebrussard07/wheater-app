export const searchCity = async (query) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
  return await response.json();
};
