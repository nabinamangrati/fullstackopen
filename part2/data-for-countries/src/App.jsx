import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(weather, "weather");
  // Access API key from environment variable
  const api_key = import.meta.env.VITE_SOME_KEY;
  console.log(api_key, "api_key from app.jsx");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        setCountries(response.data);
        setSelectedCountry(null);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again later.");
      }
    };

    if (searchTerm.trim() !== "") {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchWeather = async (capital) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrorMessage("Error fetching weather data. Please try again later.");
      }
    };

    if (selectedCountry) {
      fetchWeather(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleCountryClick = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      setSelectedCountry(response.data[0]);
      setWeather(null); // Clear previous weather data
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching country details:", error);
      setErrorMessage(
        "Error fetching country details. Please try again later."
      );
    }
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    }
    return null;
  };

  const renderCountriesWarning = () => {
    if (countries.length > 10) {
      return <p>Too many matches, please be more specific.</p>;
    }
    return null;
  };

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {renderErrorMessage()}
      {renderCountriesWarning()}

      {countries.length <= 10 && countries.length >= 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleCountryClick(country.name.common)}>
                Show
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>
            Languages: {Object.values(selectedCountry.languages).join(", ")}
          </p>
          <img src={selectedCountry.flags.png} alt="Flag" />
          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>

              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather icon"
                style={{ width: "100px", height: "100px" }}
              />
              <p>Wind : {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
