import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryClick = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      setSelectedCountry(response.data[0]);
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

      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li
              key={country.name.common}
              onClick={() => handleCountryClick(country.name.common)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>
            Languages: {Object.values(selectedCountry.languages).join(", ")}
          </p>
          <img src={selectedCountry.flags.png} alt="Flag" />
        </div>
      )}
    </div>
  );
};

export default App;
