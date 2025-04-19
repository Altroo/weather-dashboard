import React from 'react';

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

interface ForecastProps {
  data: ForecastDay[];
  unit: 'metric' | 'imperial';
}

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