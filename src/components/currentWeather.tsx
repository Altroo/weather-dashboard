import React from 'react';

interface CurrentWeatherProps {
  data: any;
  unit: 'metric' | 'imperial';
}

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