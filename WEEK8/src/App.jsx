import React from 'react';
import { useWeather } from './hooks/useWeather';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  return (
    <div className="app-container">
      <div className="glass-panel main-panel">
        <header className="app-header">
          <h1>☁️ Weather App</h1>
          <p>Real-time forecasts using Open-Meteo API</p>
        </header>
        
        <WeatherSearch onSearch={fetchWeather} loading={loading} />
        
        <WeatherDisplay data={weatherData} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
