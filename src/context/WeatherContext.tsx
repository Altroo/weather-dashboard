import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, ForecastDay, TemperatureUnit } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';

/**
 * Interface representing the weather context state and methods.
 */
interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  unit: TemperatureUnit;
  toggleUnit: () => void;
  currentWeather: WeatherData | null;
  forecast: ForecastDay[] | null;
  loading: boolean;
  error: string;
}

/**
 * Interface for the WeatherProvider props.
 */
interface WeatherProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

/**
 * Provider component that wraps the application and provides the weather context.
 */
export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [city, setCity] = useState<string>('London');
  const [unit, setUnit] = useState<TemperatureUnit>('metric');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Toggles the temperature unit between metric and imperial.
   */
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  /**
   * Fetches weather data for the specified city and unit.
   */
  const getWeatherData = async (cityName: string, units: TemperatureUnit) => {
    setLoading(true);
    setError('');
    try {
      // Use the weatherService to fetch data
      const { currentWeather: weatherData, forecast: forecastData } = await fetchWeatherData(cityName, units);
      
      // Update state with the fetched data
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data when city or unit changes
  useEffect(() => {
    getWeatherData(city, unit);
  }, [city, unit]);

  // The value that will be provided to consumers of this context
  const contextValue: WeatherContextType = {
    city,
    setCity,
    unit,
    toggleUnit,
    currentWeather,
    forecast,
    loading,
    error
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

/**
 * Custom hook to use the weather context.
 * This hook ensures that the context is being used within a WeatherProvider.
 */
export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};