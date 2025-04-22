import { WeatherData, ForecastData, ForecastDay, TemperatureUnit } from '../types/weather';

/**
 * API_KEY is a constant that stores the environment variable for the weather API key.
 * It retrieves the value from the VITE_WEATHER_API_KEY property in the environment configuration.
 * This key is used to authenticate requests to the weather API.
 */
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

/**
 * The URL endpoint for accessing weather data from the weather API.
 * This variable dynamically uses an environment variable `VITE_WEATHER_URL`
 * if it is defined, or falls back to the default URL
 * 'https://api.weatherapi.com/v1/current.json' if the environment variable is not provided.
 */
const WEATHER_URL =
  import.meta.env.VITE_WEATHER_URL || 'https://api.weatherapi.com/v1/current.json';

/**
 * The URL endpoint used to fetch weather forecast data.
 * It retrieves the value from the environment variable `VITE_FORECAST_URL`,
 * or defaults to 'https://api.weatherapi.com/v1/forecast.json' if the environment variable is not provided.
 */
const FORECAST_URL =
  import.meta.env.VITE_FORECAST_URL || 'https://api.weatherapi.com/v1/forecast.json';

/**
 * Fetches current weather data for a specified city.
 * 
 * @param {string} cityName - The name of the city to fetch weather data for
 * @returns {Promise<WeatherData>} A promise that resolves to the current weather data
 * @throws {Error} If the API request fails
 */
export const fetchCurrentWeather = async (cityName: string): Promise<WeatherData> => {
  const response = await fetch(`${WEATHER_URL}?q=${cityName}&key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch current weather data.');
  }
  
  return await response.json() as WeatherData;
};

/**
 * Fetches forecast data for a specified city.
 * 
 * @param {string} cityName - The name of the city to fetch forecast data for
 * @param {number} days - The number of days to forecast (default: 5)
 * @returns {Promise<ForecastData>} A promise that resolves to the forecast data
 * @throws {Error} If the API request fails
 */
export const fetchForecastData = async (cityName: string, days: number = 5): Promise<ForecastData> => {
  const response = await fetch(`${FORECAST_URL}?q=${cityName}&key=${API_KEY}&days=${days}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast data.');
  }
  
  return await response.json() as ForecastData;
};

/**
 * Processes raw forecast data into a more usable format.
 * 
 * @param {ForecastData} forecastData - The raw forecast data from the API
 * @param {TemperatureUnit} unit - The temperature unit to use (metric or imperial)
 * @returns {ForecastDay[]} An array of processed forecast days
 */
export const processForecastData = (forecastData: ForecastData, unit: TemperatureUnit): ForecastDay[] => {
  return forecastData.forecast.forecastday.map(day => ({
    date: day.date,
    maxTemp: unit === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f,
    minTemp: unit === 'metric' ? day.day.mintemp_c : day.day.mintemp_f,
    condition: day.day.condition.text,
  }));
};

/**
 * Fetches both current weather and forecast data for a specified city.
 * 
 * @param {string} cityName - The name of the city to fetch data for
 * @param {TemperatureUnit} unit - The temperature unit to use (metric or imperial)
 * @returns {Promise<{currentWeather: WeatherData, forecast: ForecastDay[]}>} A promise that resolves to an object containing current weather and forecast data
 * @throws {Error} If any API request fails
 */
export const fetchWeatherData = async (
  cityName: string,
  unit: TemperatureUnit
): Promise<{currentWeather: WeatherData, forecast: ForecastDay[]}> => {
  try {
    // Fetch current weather data
    const currentWeather = await fetchCurrentWeather(cityName);
    
    // Fetch forecast data
    const forecastData = await fetchForecastData(cityName);
    
    // Process forecast data
    const forecast = processForecastData(forecastData, unit);
    
    return { currentWeather, forecast };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred while fetching weather data.');
    }
  }
};