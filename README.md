# Weather Dashboard

A minimalistic weather app built with React that displays the current weather, a 5-day forecast, and supports location search along with unit toggling between metric and imperial. The application integrates with a public weather API and features responsive design for mobile, tablet, and desktop screens.

## Features

- **Current Weather Display:** Show current temperature, humidity, wind speed, and location details.
- **5-Day Forecast:** Visual day-by-day forecast including maximum and minimum temperatures.
- **Location Search:** Search for weather information by city name.
- **Unit Toggle:** Easily switch between metric and imperial units.
- **Responsive Design:** Flexible layout that adapts across devices.
- **Loading & Error Handling:** Gracefully shows loading spinners and user-friendly error messages.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- An API Key from a public weather API (e.g., [WeatherAPI](https://www.weatherapi.com/)). You won't need authorization credentials for this type of API.

## Getting Started

### 1. Clone the Repository

### 2. Install Dependencies

Install the required packages using npm:

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your API configuration:

Replace `your_api_key_here` with your actual API key. Adjust the API endpoints if you decide to use a different public API.

### 4. Run the Application

Launch the development server:

This will start the application and typically open it in your default browser at `http://localhost:3000` (or another port if configured differently).

## Project Structure

- `src/App.tsx` - Main application component handling API integration, state management, and layout.
- `src/components/`
    - `CurrentWeather.tsx` - Displays current weather details.
    - `Forecast.tsx` - Renders a 5-day forecast with daily weather conditions.
    - `SearchBar.tsx` - Provides the location search functionality.
    - `UnitToggle.tsx` - Allows users to switch between metric and imperial units.
- `src/App.sass` - Contains styling, including responsive adjustments for the header and other components.

## Usage

1. **Search for a Location:**  
   Enter a city name in the search bar to view the corresponding weather data.
2. **Switch Units:**  
   Use the unit toggle button in the header to switch between metric and imperial measurements.
3. **Responsive Design:**  
   The dashboard adapts to various screen sizes, providing an optimal user experience on mobile devices as well as on desktops.

## Error Handling

- When an API call fails, a user-friendly error message is displayed.
- Loading states are managed with conditional rendering, ensuring that incomplete or empty data is not shown.
