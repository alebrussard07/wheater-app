// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCityCoords, getWeatherData } from './services/api';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favCities')) || []);

  // Effetto per salvare i preferiti ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem('favCities', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    try {
      const city = await getCityCoords(query);
      if (city) {
        const weatherData = await getWeatherData(city.lat, city.lon);
        setWeather(weatherData.current_weather);
        setCityInfo(city);
      }
    } catch (error) {
      alert("Errore nel recupero dati");
    }
  };

  const addFavorite = () => {
    if (cityInfo && !favorites.find(f => f.display_name === cityInfo.display_name)) {
      setFavorites([...favorites, cityInfo]);
    }
  };

  const removeFavorite = (name) => {
    setFavorites(favorites.filter(f => f.display_name !== name));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">Meteo Didattico</Typography>
      
      {/* Barra di Ricerca */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField 
          fullWidth 
          label="Cerca una città (es: Roma)" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <Button variant="contained" onClick={handleSearch}>Cerca</Button>
      </Box>

      <Grid container spacing={3}>
        {/* Risultato Meteo */}
        <Grid item xs={12} md={8}>
          {weather && (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
              <IconButton 
                onClick={addFavorite}
                sx={{ position: 'absolute', top: 10, right: 10, color: 'red' }}
              >
                <FavoriteIcon />
              </IconButton>
              <Typography variant="h4">{cityInfo?.display_name.split(',')[0]}</Typography>
              <Typography variant="h2">{weather.temperature}°C</Typography>
              <Typography variant="subtitle1">Codice Meteo: {weather.weathercode}</Typography>
            </Paper>
          )}
        </Grid>

        {/* Elenco Preferiti */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">I tuoi Preferiti</Typography>
          <List>
            {favorites.map((fav, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => removeFavorite(fav.display_name)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText 
                    primary={fav.display_name.split(',')[0]} 
                    sx={{ cursor: 'pointer' }}
                    onClick={() => { setQuery(fav.display_name); handleSearch(); }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;