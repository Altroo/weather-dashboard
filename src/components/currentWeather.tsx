import React from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';

/**
 * Interface representing the properties for the CurrentWeather component.
 *
 * @interface CurrentWeatherProps
 * @property {WeatherData} data - The weather data to be displayed, typically obtained from a weather API.
 * @property {TemperatureUnit} unit - The unit system used for displaying weather information.
 *                                    'metric' for Celsius and 'imperial' for Fahrenheit.
 */
interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

/**
 * A React functional component that displays the current weather information
 * for a given location, including temperature, humidity, and wind speed.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The weather data containing current conditions and location details.
 * @param {Object} props.data.current - The current weather conditions.
 * @param {number} props.data.current.temp_c - The current temperature in Celsius.
 * @param {number} props.data.current.temp_f - The current temperature in Fahrenheit.
 * @param {number} props.data.current.humidity - The current humidity percentage.
 * @param {number} props.data.current.wind_kph - The current wind speed in kilometers per hour.
 * @param {number} props.data.current.wind_mph - The current wind speed in miles per hour.
 * @param {Object} props.data.location - The location information.
 * @param {string} props.data.location.name - The name of the location (e.g., city).
 * @param {string} props.data.location.country - The name of the country of the location.
 * @param {"metric"|"imperial"} props.unit - The unit system to display for temperature and wind speed ("metric" for Celsius and kilometers per hour or "imperial" for Fahrenheit and miles per hour).
 * @returns {JSX.Element|null} A JSX element displaying the current weather or null if the data is incomplete.
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  if (!data || !data.current || !data.location) return null;

  const temperature = unit === 'metric' ? data.current.temp_c : data.current.temp_f;
  const humidity = data.current.humidity;
  const windSpeed = unit === 'metric' ? data.current.wind_kph : data.current.wind_mph;

  return (
    <div className="current-weather">
      <h2>
        {data.location.name}, {data.location.country}
      </h2>
      <p>Temperature: {temperature} {unit === 'metric' ? '°C' : '°F'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {windSpeed} {unit === 'metric' ? 'kph' : 'mph'}</p>
    </div>
  );
};

export default CurrentWeather;
