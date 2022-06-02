import React from 'react'
import "./App.css";
import { useState, useEffect } from "react";
import Sunny from "./assets/sunny.jpg"
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";

function App() {

  const [place, setPlace] = useState('Rio de Janeiro')
  const [placeInfo, setPlaceInfo] = useState({})



  useEffect(() => {
    handleFetch()
    // eslint-disable-next-line 
  }, []);


  const handleFetch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=37f25b3b3f9d47069f8223215220505&q=${place}&aqi=no`)
      .then(response => response.json())
      .then(data => setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        celcius: {
          current: data.current.temp_c,
        },
        condition: data.current.condition.text
      }))
  };

  const Search = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  }

  return (
    <div
      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Sunny})` }
          : placeInfo.condition?.toLowerCase() === "clear"
            ? { backgroundImage: `url(${Clear})` }
            : placeInfo.condition?.includes("cloudy")
              ? { backgroundImage: `url(${Cloudy})` }
              : placeInfo.condition?.toLowerCase().includes("rainy")
                ? { backgroundImage: `url(${Rainy})` }
                : placeInfo.condition?.toLowerCase().includes("snow")
                  ? { backgroundImage: `url(${Snow})` }
                  : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="content">

        <div className="search-input">
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Type a place :)"
            onKeyDown={Search}
            spellCheck="false"
          />
        </div>

        <div className="weather-container">
          <div className="degree">
            <h1>{placeInfo.celcius?.current}° C</h1>
          </div>
          <div className="condition">
            <h1>{placeInfo.condition}</h1>
          </div>
          <div className="location">
            <h2>{placeInfo.name}, {placeInfo.country}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;