import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, TextField, Button, Grid, Paper, 
  List, ListItem, ListItemText, IconButton, CircularProgress, 
  Divider, Card, CardContent 
} from '@mui/material';

// Icone Material UI
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import HeightIcon from '@mui/icons-material/Height';

// Importiamo i servizi API (assicurati che src/services/api.js esista!)
import { getCityCoords, getWeatherData } from './services/api';

// --- FUNZIONI DI SUPPORTO (HELPERS) ---

const getWeatherDesc = (code) => {
  const codes = {
    0: "Cielo Sereno",
    1: "Quasi Sereno", 2: "Parzialmente Nuvoloso", 3: "Nuvoloso",
    45: "Nebbia", 48: "Nebbia con brina",
    51: "Pioggerellina", 61: "Pioggia Leggera", 63: "Pioggia Moderata",
    71: "Neve Leggera", 80: "Rovesci di pioggia",
    95: "Temporale",
  };
  return codes[code] || "Meteo Variabile";
};

const getWeatherIcon = (code) => {
  const iconStyle = { fontSize: 80, filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' };
  if (code === 0) return <WbSunnyIcon sx={{ ...iconStyle, color: '#ffb300' }} />;
  if (code >= 1 && code <= 3) return <CloudIcon sx={{ ...iconStyle, color: '#cfd8dc' }} />;
  if (code >= 51 && code <= 82) return <UmbrellaIcon sx={{ ...iconStyle, color: '#0288d1' }} />;
  if (code >= 95) return <ThunderstormIcon sx={{ ...iconStyle, color: '#455a64' }} />;
  return <CloudIcon sx={{ ...iconStyle, color: '#90a4ae' }} />;
};

// --- COMPONENTE PRINCIPALE ---

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favCities');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva i preferiti ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem('favCities', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const city = await getCityCoords(searchQuery);
      if (city) {
        const weatherData = await getWeatherData(city.lat, city.lon);
        setWeather(weatherData.current_weather);
        setCityInfo(city);
      } else {
        alert("Città non trovata!");
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore nel recupero dati");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!cityInfo) return;
    const isAlreadyFav = favorites.find(f => f.place_id === cityInfo.place_id);
    
    if (isAlreadyFav) {
      setFavorites(favorites.filter(f => f.place_id !== cityInfo.place_id));
    } else {
      setFavorites([...favorites, cityInfo]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Intestazione */}
      <Typography variant="h2" align="center" fontWeight="800" gutterBottom sx={{ color: '#1a237e', mb: 4 }}>
        Weather App
      </Typography>

      {/* Barra di Ricerca */}
      <Paper elevation={3} sx={{ p: 1, display: 'flex', alignItems: 'center', mb: 5, borderRadius: 50, px: 3 }}>
        <TextField 
          fullWidth 
          variant="standard" 
          placeholder="Cerca una città nel mondo..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{ disableUnderline: true }}
        />
        <IconButton onClick={() => handleSearch()}>
          <SearchIcon color="primary" />
        </IconButton>
      </Paper>

      <Grid container spacing={4}>
        {/* Sinistra: Card Meteo Principale */}
        <Grid item xs={12} md={8}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress size={60} />
            </Box>
          ) : weather ? (
            <Paper 
              elevation={10} 
              sx={{ 
                p: 4, borderRadius: 6, textAlign: 'center', color: 'white',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                position: 'relative'
              }}
            >
              <IconButton 
                onClick={toggleFavorite}
                sx={{ position: 'absolute', top: 20, right: 20, color: favorites.find(f => f.place_id === cityInfo.place_id) ? '#ff5252' : 'white' }}
              >
                <FavoriteIcon fontSize="large" />
              </IconButton>

              <Typography variant="h3" fontWeight="700">{cityInfo.display_name.split(',')[0]}</Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mb: 2 }}>{cityInfo.display_name.split(',').slice(1, 3).join(',')}</Typography>
              
              <Box sx={{ my: 3 }}>{getWeatherIcon(weather.weathercode)}</Box>
              
              <Typography variant="h1" fontWeight="bold">{Math.round(weather.temperature)}°C</Typography>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 300 }}>{getWeatherDesc(weather.weathercode)}</Typography>

              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <PeopleIcon />
                    <Typography>Geo-ID: {cityInfo.place_id.toString().slice(0,5)}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <HeightIcon />
                    <Typography>Lat: {parseFloat(cityInfo.lat).toFixed(2)}°</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Box sx={{ textAlign: 'center', py: 10, border: '2px dashed #ccc', borderRadius: 6 }}>
              <Typography color="textSecondary">Cerca una città per visualizzare i dettagli meteo e geografici</Typography>
            </Box>
          )}
        </Grid>

        {/* Destra: Preferiti */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon color="error" /> Preferiti
          </Typography>
          <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            {favorites.length === 0 ? (
              <Typography sx={{ p: 3, textAlign: 'center' }} color="textSecondary">Nessuna città salvata</Typography>
            ) : (
              <List sx={{ p: 0 }}>
                {favorites.map((fav) => (
                  <React.Fragment key={fav.place_id}>
                    <ListItem 
                      secondaryAction={
                        <IconButton edge="end" onClick={() => setFavorites(favorites.filter(f => f.place_id !== fav.place_id))}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemText 
                        primary={fav.display_name.split(',')[0]} 
                        secondary={fav.display_name.split(',')[1]}
                        sx={{ px: 2, py: 1, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}
                        onClick={() => {
                          setQuery(fav.display_name.split(',')[0]);
                          handleSearch(fav.display_name.split(',')[0]);
                        }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;