import React from 'react';
import SearchBar from './components/searchBar';
import UnitToggle from './components/unitToggle';
import CurrentWeather from './components/currentWeather';
import Forecast from './components/forecast';
import { useWeather } from './context/WeatherContext';
import './App.sass';

/**
 * The `App` component serves as the main entry point for the weather dashboard application.
 *
 * It uses the WeatherContext to access and display weather data, and provides UI components
 * for searching cities and toggling temperature units.
 *
 * Subcomponents:
 * - `SearchBar`: Component for entering and submitting a city search query.
 * - `UnitToggle`: Component for toggling between "metric" and "imperial" units.
 * - `CurrentWeather`: Displays the current weather information.
 * - `Forecast`: Displays the 5-day weather forecast.
 */
const App: React.FC = () => {
  // Get weather data and functions from context
  const { 
    city, 
    setCity, 
    unit, 
    toggleUnit, 
    currentWeather, 
    forecast, 
    loading, 
    error 
  } = useWeather();

  const handleSearch = (cityName: string) => {
    setCity(cityName);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather Dashboard - {city}</h1>
        <UnitToggle unit={unit} toggleUnit={toggleUnit} />
      </header>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
      {forecast && <Forecast data={forecast} unit={unit} />}
    </div>
  );
};

export default App;
