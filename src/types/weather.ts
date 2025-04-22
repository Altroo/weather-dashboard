/**
 * Type definition for temperature units used throughout the application.
 * 'metric' represents Celsius, 'imperial' represents Fahrenheit.
 */
export type TemperatureUnit = 'metric' | 'imperial';

/**
 * Interface representing the current weather conditions.
 */
export interface CurrentWeatherCondition {
  temp_c: number;
  temp_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

/**
 * Interface representing location information.
 */
export interface Location {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  localtime: string;
}

/**
 * Interface representing the complete weather data response.
 */
export interface WeatherData {
  current: CurrentWeatherCondition;
  location: Location;
}

/**
 * Interface representing a single day's forecast.
 */
export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

/**
 * Interface representing the raw forecast day data from the API.
 */
export interface RawForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}

/**
 * Interface representing the complete forecast data response.
 */
export interface ForecastData {
  forecast: {
    forecastday: RawForecastDay[];
  };
}