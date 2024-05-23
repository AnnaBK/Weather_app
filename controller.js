class WeatherController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentWeatherData;
    this.view.setSearchHandler(this.handleSearch.bind(this));
    this.view.setToggleUnitsHandler(this.handleToggleUnits.bind(this));
    this.initialize();
  }

  initialize() {
    this.updateTime();
    this.view.displayCurrentDay();
    setInterval(() => this.updateTime(), 1000);
    this.displayWeatherByCurrentLocation();
  }

  updateTime() {
    this.view.displayCurrentTime();
  }

  displayWeatherByCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.model
            .fetchWeatherByCoordinates(latitude, longitude)
            .then((weatherData) => {
              this.view.displayWeatherInfo(weatherData);
              this.currentWeatherData = weatherData;
              this.model
                .fetchForecast(weatherData.name)
                .then((forecastData) => {
                  this.view.displayForecast(forecastData);
                });
            });
        },
        (error) => {
          this.model.fetchWeather("kyiv").then((weatherData) => {
            this.view.displayWeatherInfo(weatherData);
            this.currentWeatherData = weatherData;
            this.model.fetchForecast(weatherData.name).then((forecastData) => {
              this.view.displayForecast(forecastData);
            });
          });
        }
      );
    } else {
      this.model.fetchWeather("kyiv").then((weatherData) => {
        this.view.displayWeatherInfo(weatherData);
        this.currentWeatherData = weatherData;
        this.model.fetchForecast(weatherData.name).then((forecastData) => {
          this.view.displayForecast(forecastData);
        });
      });
    }
  }

  handleSearch(event) {
    event.preventDefault();
    const cityInput = document.querySelector("#city-name");
    const city = cityInput.value;
    this.model.fetchWeather(city).then((weatherData) => {
      if (weatherData) {
        this.view.displayWeatherInfo(weatherData);
        this.currentWeatherData = weatherData;
        this.model.fetchForecast(city).then((forecastData) => {
          if (forecastData) {
            this.view.displayForecast(forecastData);
          } else {
            this.view.displayError("Can't find the city");
          }
        });
      } else {
        this.view.displayError("Can't find the city");
      }
    });
    cityInput.value = "";
  }

  handleToggleUnits() {
    if (this.currentWeatherData) {
      const tempCelsius = this.currentWeatherData.main.temp;
      this.view.toggleUnits();
      this.view.updateTemperatureDisplay(tempCelsius);
    }
  }
}
