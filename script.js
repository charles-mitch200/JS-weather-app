const apiKey = "";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
const inputElem = document.querySelector(".js-input");
const buttonElem = document.querySelector(".js-search-btn");
const weatherIcon = document.querySelector(".weather-icon");

//  function to get weather
const getWeatherData = async (city) => {
  const response = await fetch(apiURL + `&q=${city}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    document.querySelector(".weather-icon").innerHTML = data.weather.icon;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/cloudy.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/sun.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/storm.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/fog.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
};

// Add event listener to the button
buttonElem.addEventListener("click", () => {
  const cityName = inputElem.value;
  getWeatherData(cityName);
});
