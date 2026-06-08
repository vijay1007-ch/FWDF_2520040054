import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="weather-display loading">
        <div className="spinner"></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-display error">
        <p>❌ {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="weather-display empty">
        <p>Enter a city name to see the weather forecast.</p>
      </div>
    );
  }

  return (
    <div className="weather-display success">
      <h2>{data.city}, {data.country}</h2>
      <div className="weather-details">
        <div className="weather-card temp">
          <h3>Temperature</h3>
          <p className="value">{data.temperature}°C</p>
        </div>
        <div className="weather-card wind">
          <h3>Wind Speed</h3>
          <p className="value">{data.windspeed} km/h</p>
        </div>
      </div>
      <p className="time-info">Last updated: {data.time.replace('T', ' ')}</p>
    </div>
  );
};

export default WeatherDisplay;
