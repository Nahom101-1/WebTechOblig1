const CitiesWithCoordinates = [
  { city: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
  { city: 'OSLO', latitude: 59.9139, longitude: 10.7522 },
  { city: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { city: 'Bangladesh', latitude: 23.685, longitude: 90.3563 },
  { city: 'Stockholm', latitude: 59.3293, longitude: 18.0686 },
];

// Function to fetch and display weather data for all cities
function displayWeatherForAllCities() {
  const container = document.querySelector('.weather-container');
  container.innerHTML = '';

  // Loop through each city and fetch weather data
  for (let i = 0; i < CitiesWithCoordinates.length; i++) {
    const city = CitiesWithCoordinates[i].city;
    const latitude = CitiesWithCoordinates[i].latitude;
    const longitude = CitiesWithCoordinates[i].longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    // Fetch weather data for the current city
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        // Create section for each city's weather display
        const citySection = document.createElement('section');
        citySection.classList.add('weather-display');

        // City name
        const cityName = document.createElement('h1');
        cityName.textContent = city;

        // Weather info container
        const weatherInfoDiv = document.createElement('div');
        weatherInfoDiv.classList.add('weather-info');

        // Temperature section
        const temperatureDiv = document.createElement('div');
        temperatureDiv.classList.add('temperature');
        const temperature = document.createElement('h2');
        temperature.textContent = `${data.current_weather.temperature}°C`;
        temperatureDiv.appendChild(temperature);

        // Weather details section
        const weatherDetailsDiv = document.createElement('div');
        weatherDetailsDiv.classList.add('weather-details');
        const windSpeed = document.createElement('p');
        windSpeed.innerHTML = `Wind Speed: <span id="wind-speed">${data.current_weather.windspeed} km/h</span>`;
        weatherDetailsDiv.appendChild(windSpeed);

        // Append temperature and details to weather info
        weatherInfoDiv.appendChild(temperatureDiv);
        weatherInfoDiv.appendChild(weatherDetailsDiv);

        // Append city name and weather info to the city section
        citySection.appendChild(cityName);
        citySection.appendChild(weatherInfoDiv);

        // Append the entire section to the container
        container.appendChild(citySection);
      })
      .catch((error) => {
        console.error(`Error fetching weather data for ${city}:`, error);
      });
  }
}

// Call the function to display weather for all cities on page load
displayWeatherForAllCities();
setInterval(updateFunction, 60000);
