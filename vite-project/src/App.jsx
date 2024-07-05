import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState(''); // Input for city name
  const [loading, setLoading] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState('');
  
  const handleFetchWeather = () => {
    if (city) {
      setLoading(true);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ec37c8ad1fe0a07dc4f465b5d220dad9`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setLoading(false);

          const condition = data.weather[0].main.toLowerCase(); 
          setWeatherCondition(condition);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className={`App ${weatherCondition}`}>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button className="Button" onClick={handleFetchWeather}>Get Weather</button>
      </div>
      {loading && <p>Loading...</p>}
      {weather.main && (
        <div>
          <p>City: {weather.name}</p>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;
