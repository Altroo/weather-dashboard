import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';
import UnitToggle from './components/unitToggle';
import CurrentWeather from './components/currentWeather';
import Forecast from './components/forecast';
import './App.sass';

/**
 * API_KEY is a constant that stores the environment variable for the weather API key.
 * It retrieves the value from the VITE_WEATHER_API_KEY property in the environment configuration.
 * This key is used to authenticate requests to the weather API.
 *
 * Note:
 * Ensure that the VITE_WEATHER_API_KEY environment variable is properly defined
 * in the application's environment configuration file.
 */
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
/**
 * The URL endpoint for accessing weather data from the weather API.
 * This variable dynamically uses an environment variable `VITE_WEATHER_URL`
 * if it is defined, or falls back to the default URL
 * 'http://api.weatherapi.com/v1/current.json' if the environment variable is not provided.
 *
 * The URL is expected to point to the current weather endpoint of the weather API.
 */
const WEATHER_URL =
  import.meta.env.VITE_WEATHER_URL || 'http://api.weatherapi.com/v1/current.json';
/**
 * The URL endpoint used to fetch weather forecast data.
 * It retrieves the value from the environment variable `VITE_FORECAST_URL`,
 * or defaults to 'http://api.weatherapi.com/v1/forecast.json' if the environment variable is not provided.
 *
 * This URL is typically utilized for making API requests to access weather forecast information.
 */
const FORECAST_URL =
  import.meta.env.VITE_FORECAST_URL || 'http://api.weatherapi.com/v1/forecast.json';

/**
 * Represents the forecast details for a single day.
 *
 * @interface ForecastDay
 * @property {string} date The date of the forecast in ISO 8601 format.
 * @property {number} maxTemp The maximum temperature expected on this day.
 * @property {number} minTemp The minimum temperature expected on this day.
 * @property {string} condition A brief description of the weather condition for this day.
 */
interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

/**
 * The `App` component serves as the main entry point for the weather dashboard application.
 *
 * It manages the following functionalities:
 * - Fetching and displaying current weather and 5-day forecast data for a specified city.
 * - Allowing users to search for a city and toggle between temperature units (metric or imperial).
 * - Rendering subcomponents such as the search bar, unit toggle, current weather, and forecast.
 *
 * State Variables:
 * - `city`: The name of the city for which weather data is fetched.
 * - `unit`: The preferred unit system for temperatures, either "metric" (Celsius) or "imperial" (Fahrenheit).
 * - `currentWeather`: Object containing the current weather data.
 * - `forecast`: Array of forecast data for the next 5 days, including temperature ranges and conditions.
 * - `loading`: Boolean indicating if the weather data is being fetched.
 * - `error`: Error message string, if an error occurs while fetching weather data.
 *
 * Methods:
 * - `fetchWeatherData(cityName, units)`: Asynchronous function to fetch the current weather and 5-day forecast based on the provided city and unit.
 * - `handleSearch(cityName)`: Updates the `city` state when a new city is searched.
 * - `toggleUnit()`: Toggles the temperature unit between "metric" and "imperial".
 *
 * Lifecycle:
 * - The `useEffect` hook is used to fetch weather data whenever the `city` or `unit` state changes.
 *
 * Subcomponents:
 * - `SearchBar`: Component for entering and submitting a city search query.
 * - `UnitToggle`: Component for toggling between "metric" and "imperial" units.
 * - `CurrentWeather`: Displays the current weather information.
 * - `Forecast`: Displays the 5-day weather forecast.
 */
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