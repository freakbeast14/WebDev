const searchElement = document.querySelector("[data-city-search]");
const submit = document.querySelector(".submit");
submit.addEventListener("click", () => {
  const place = searchElement.value;
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      place +
      "&appid=66f956f14dbd67c0e9b32e54d6c9ba94"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setWeatherData(data);
    })
    .catch((err) => alert("Enter proper location"));
});

const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const precipitationElement = document.querySelector("[data-precipitation]");
const windElement = document.querySelector("[data-wind]");
const icon = document.querySelector(".icon-container");

icon.innerHTML = `<img src=${"icons/unknown.png"}>`;

const setWeatherData = (data) => {
  locationElement.textContent = data.name + "," + data.sys.country;
  statusElement.textContent = data.weather[0].description;
  temperatureElement.textContent =
    eval((data.main.temp - 273.15).toFixed(2)) + "°C";
  precipitationElement.textContent = data.rain
    ? eval((data.rain["1h"] * 100).toFixed(2)) + "%"
    : "0%";
  windElement.innerHTML = data.wind.speed + "m/s";
  icon.innerHTML = `<img src=${
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@4x.png"
  }>`;
};
