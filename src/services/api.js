// src/services/api.js

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";
const OPENMETEO_BASE = "https://api.open-meteo.com/v1/forecast";

// 1. Cerca la città e ottiene coordinate e nome formattato
export const getCityCoords = async (query) => {
  const response = await fetch(`${NOMINATIM_BASE}?q=${query}&format=json&limit=1`);
  const data = await response.json();
  return data[0]; // Restituisce il primo risultato
};

// 2. Ottiene il meteo usando le coordinate
export const getWeatherData = async (lat, lon) => {
  const url = `${OPENMETEO_BASE}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(url);
  return await response.json();
};

// 3. Ottiene info geografiche (GeoDB)
// Nota: GeoDB su RapidAPI richiede spesso una Key.
// Per semplicità, questa funzione è un placeholder.
export const getCityDetails = async (lat, lon) => {
    // Esempio semplificato: moltiplicando i dati per mostrare info extra
    // In un caso reale qui si userebbe un'API come GeoDB Cities con una API Key.
    return {
        population: "Dati non disponibili (API Key richiesta)",
        elevation: "Variabile",
        timezone: "Europe/Rome"
    };
};

