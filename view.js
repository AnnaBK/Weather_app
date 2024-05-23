class WeatherView {
  constructor() {
    this.currentTimeElement = document.querySelector("#current-time");
    this.currentDayElement = document.querySelector("#current-day");
    //   this.searchedCityElement = document.querySelector("#city-name").value;
    this.currentCityElement = document.querySelector("#current-city");
    this.currentTemperatureElement = document.querySelector(
      "#current-temperature"
    );
    this.humidityElement = document.querySelector("#humidity");
    this.windElement = document.querySelector("#wind");
    this.weatherTypeElement = document.querySelector("#weather-type");
    this.searchBarElement = document.querySelector("#search-form");
    this.weekForecastElement = document.querySelector("#week-forecast");
    this.toggleUnitsButton = document.querySelector("#toggle-units");
    this.isCelsius = true;
  }

  formatTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  formatDay(date) {
    const dayArray = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[dayArray];
    return day;
  }

  displayCurrentTime() {
    let newCurrentTime = new Date();
    this.currentTimeElement.innerHTML = this.formatTime(newCurrentTime);
  }

  displayCurrentDay() {
    let newCurrentDay = new Date();
    this.currentDayElement.innerHTML = this.formatDay(newCurrentDay);
  }

  displayWeatherInfo(data) {
    this.currentCityElement.innerHTML = data.name;
    const temperature = Math.round(data.main.temp);
    this.currentTemperatureElement.innerHTML = `${temperature}°`;
    const humidity = data.main.humidity;
    this.humidityElement.innerHTML = `${humidity}%`;
    const windSpeed = Math.round(data.wind.speed);
    this.windElement.innerHTML = `${windSpeed}m/s`;
    this.weatherTypeElement.innerHTML = data.weather[0].main;
  }

  displayForecast(data) {
    this.weekForecastElement.innerHTML = "";
    data.list.forEach((item, index) => {
      if (index % 8 === 0) {
        const day = new Date(item.dt_txt).toLocaleString("en-US", {
          weekday: "short",
        });
        const temp = Math.round(item.main.temp);
        const weather = item.weather[0].main;
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

        const forecastCol = document.createElement("div");
        forecastCol.classList.add("col");
        forecastCol.innerHTML = `
                    <h3>${day}</h3>
                    <br /><img src="${icon}" /><br />
                    <p class="weather">${weather}</p>
                    <span>${temp}°</span>
                `;
        this.weekForecastElement.appendChild(forecastCol);
      }
    });
  }

  displayError(message) {
    this.currentCityElement.innerHTML = message;
    this.currentTemperatureElement.innerHTML = '';
    this.humidityElement.innerHTML = '';
    this.windElement.innerHTML = '';
    this.weatherTypeElement.innerHTML = '';
    this.weekForecastElement.innerHTML = '';
}

  setSearchHandler(handler) {
    this.searchBarElement.addEventListener("click", handler);
  }

  setToggleUnitsHandler(handler) {
    this.toggleUnitsButton.addEventListener("click", handler);
}

toggleUnits() {
    this.isCelsius = !this.isCelsius;
    this.toggleUnitsButton.innerHTML = this.isCelsius ? 'Change to Fahrenheit' : 'Change to Celsius';
}

updateTemperatureDisplay(tempCelsius) {
    const temp = this.isCelsius ? tempCelsius : (tempCelsius * 9/5) + 32;
    this.currentTemperatureElement.innerHTML = `${Math.round(temp)}°`;
}
}