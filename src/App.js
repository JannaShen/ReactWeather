
import './App.css';
import React, { useState } from "react";
import axios from "axios";

function App() {
  let [city, setCity] = useState("New York");
  const [weather, setWeather] = useState({
      temperature: "19",
      wind: "10",
      humidity: "80",
      icon: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
      description: "Cloudy"
  });
 
  function displayWeather(response) {
   
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  
  return (
    <div class="Weather">
      <form class="mb-3" onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-9">
            <input
              type="search"
              placeholder="Type a city.."
              class="form-control"
              autocomplete="off"
              onChange={updateCity}
            />
          </div>
          <div class="col-3">
            <input type="submit" class="btn btn-primary w-100" value="Search" />
          </div>
        </div>
      </form>
      <div class="overview">
        <h1>{city}</h1>
        <ul>
          <li>Last updated: Tuesday 10:00</li>
          <li>{weather.description}</li>
        </ul>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="clearfix weather-temperature">
            <img
              src={weather.icon}
              alt={weather.description}
              class="float-left"
            />
            <div class="float-left">
              <strong>{Math.round(weather.temperature)}</strong>
              <span class="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <ul>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind} km/h</li>
          </ul>
        </div>
      </div>
      <div id="display"></div>
      <a href="https://github.com/JannaShen/ReactWeather">Open source Code Here</a>
    </div>
  );
  
}

export default App;
