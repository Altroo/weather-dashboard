import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';
import UnitToggle from './components/unitToggle';
import CurrentWeather from './components/currentWeather';
import Forecast from './components/forecast';
import './App.sass';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const WEATHER_URL =
  import.meta.env.VITE_WEATHER_URL || 'http://api.weatherapi.com/v1/current.json';
const FORECAST_URL =
  import.meta.env.VITE_FORECAST_URL || 'http://api.weatherapi.com/v1/forecast.json';

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>('London');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = async (cityName: string, units: 'metric' | 'imperial') => {
    setLoading(true);
    setError('');
    try {
      // Fetch current weather data
      const currentRes = await fetch(
        `${WEATHER_URL}?q=${cityName}&key=${API_KEY}`
      );
      if (!currentRes.ok) {
        throw new Error('Failed to fetch current weather data.');
      }
      const currentData = await currentRes.json();

      // Fetch forecast data for 5 days
      const forecastRes = await fetch(
        `${FORECAST_URL}?q=${cityName}&key=${API_KEY}&days=5`
      );
      if (!forecastRes.ok) {
        throw new Error('Failed to fetch weather forecast data.');
      }
      const forecastData = await forecastRes.json();

      // Process forecast data to extract required fields for each day
      const processedForecast: ForecastDay[] = forecastData.forecast.forecastday.map(
        (day: any) => ({
          date: day.date,
          maxTemp: units === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f,
          minTemp: units === 'metric' ? day.day.mintemp_c : day.day.mintemp_f,
          condition: day.day.condition.text,
        })
      );

      setCurrentWeather(currentData);
      setForecast(processedForecast);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city, unit);
  }, [city, unit]);

  const handleSearch = (cityName: string) => {
    setCity(cityName);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Weather Dashboard</h1>
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