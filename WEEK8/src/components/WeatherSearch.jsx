import React, { useState } from 'react';
import './WeatherSearch.css';

const WeatherSearch = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className="weather-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
        disabled={loading}
      />
      <button type="submit" className="search-btn" disabled={loading || !city.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default WeatherSearch;
