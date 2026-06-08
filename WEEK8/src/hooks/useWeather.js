import { useState } from 'react';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // 1. Fetch Coordinates for the City
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      if (!geoRes.ok) throw new Error('Failed to fetch location data');
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try again.');
      }
      
      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch Weather using Coordinates
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      if (!weatherRes.ok) throw new Error('Failed to fetch weather data');
      const weatherInfo = await weatherRes.json();

      setWeatherData({
        city: name,
        country: country,
        temperature: weatherInfo.current_weather.temperature,
        windspeed: weatherInfo.current_weather.windspeed,
        time: weatherInfo.current_weather.time
      });
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
};
