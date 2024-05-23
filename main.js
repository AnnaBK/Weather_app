document.addEventListener("DOMContentLoaded", () => {
  const model = new WeatherModel();
  const view = new WeatherView();
  const controller = new WeatherController(model, view);
});
