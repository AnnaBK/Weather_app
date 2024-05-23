class WeatherModel {
  constructor() {
    this.apiKey = "2b5fc755ac2ec59250868b5527df31c4";
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    this.forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  }

  fetchWeather(city) {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        return null;
      });
  }

  fetchWeatherByCoordinates(lat, lon) {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching weather by coordinates:", error);
        return null;
      });
  }

  fetchForecast(city) {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        return null;
      });
  }
}
