# City Weather Information Dashboard

The City Weather Information Dashboard is a web-based application designed to provide users with real-time weather data for a selected city. Utilizing the 7timer weather API, this dashboard fetches and displays weather conditions based on the user's selection from a pre-populated list of European cities.

## Features

- **City Selection**: Users can select a city from a dropdown list to view its current weather conditions.
- **Real-Time Weather Data**: Displays real-time weather information including temperature, wind speed, and conditions.

- **Responsive Bootstrap Design**: Ensures a seamless experience across various devices and screen sizes.

## Getting Started

To use the City Weather Information Dashboard, simply load the application in your web browser. The city selection dropdown will automatically populate with available cities. Select a city to view its current weather conditions.

## How It Works

The application fetches a list of cities and their coordinates from a local CSV file (`city_coordinates.csv`) upon initialization. Users can select a city from this list, and the application will then use the selected city's coordinates to fetch weather data from the 7timer weather API.

### Fetching City Coordinates

Upon loading, the application reads the `city_coordinates.csv` file to populate the city selection dropdown:

```javascript
fetch('city_coordinates.csv')
    .then(response => response.text())
    .then(data => {
        // Process CSV data and populate the dropdown
    });