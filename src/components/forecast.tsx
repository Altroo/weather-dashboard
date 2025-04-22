import React from 'react';
import { ForecastDay, TemperatureUnit } from '../types/weather';

/**
 * Represents the properties for a weather forecast component.
 *
 * @interface ForecastProps
 *
 * @property {ForecastDay[]} data - An array of forecast data representing weather conditions for each day.
 * @property {TemperatureUnit} unit - The unit system for representing weather data. Possible values are "metric" for Celsius and "imperial" for Fahrenheit.
 */
interface ForecastProps {
  data: ForecastDay[];
  unit: TemperatureUnit;
}

/**
 * Returns an SVG icon representing a weather condition.
 *
 * @param {string} condition - A string describing the weather condition (e.g., "sunny", "rain", etc.).
 * @returns {JSX.Element} An SVG element corresponding to the specified weather condition:
 * - A sun icon for sunny conditions.
 * - A cloud with raindrops icon for rainy conditions.
 * - A default gray circle icon for unknown conditions.
 */
const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('sunny')) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="yellow">
        <circle cx="12" cy="12" r="5" />
        <g stroke="orange" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </g>
      </svg>
    );
  } else if (lower.includes('rain')) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path d="M16 13a4 4 0 0 0-8 0" stroke="blue" strokeWidth="2" fill="none" />
        <line x1="8" y1="15" x2="8" y2="17" stroke="blue" strokeWidth="2" />
        <line x1="12" y1="15" x2="12" y2="17" stroke="blue" strokeWidth="2" />
        <line x1="16" y1="15" x2="16" y2="17" stroke="blue" strokeWidth="2" />
      </svg>
    );
  } else {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="2" fill="lightgray" />
      </svg>
    );
  }
};

/**
 * A React functional component that displays a 5-day weather forecast.
 *
 * @component
 * @param {Object} props - The props object for the Forecast component.
 * @param {Array<Object>} props.data - An array of forecast data for multiple days. Each item represents a day's weather details such as date, condition, max temperature, and min temperature.
 * @param {string} props.unit - A string representing the temperature unit, either "metric" for Celsius or any other value (e.g., "imperial") for Fahrenheit.
 * @returns {JSX.Element|null} The rendered forecast component if data is provided and not empty, otherwise null.
 */
const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {data.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-day-header">
              <p className="date">
                <strong>{day.date}</strong>
              </p>
              <div className="icon">{getWeatherIcon(day.condition)}</div>
            </div>
            <div className="forecast-day-details">
              <p>
                Max: {day.maxTemp} {unit === 'metric' ? '°C' : '°F'}
              </p>
              <p>
                Min: {day.minTemp} {unit === 'metric' ? '°C' : '°F'}
              </p>
              <p className="condition">{day.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
