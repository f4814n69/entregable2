import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weathers = () => {

  const [showWeathers, setShowWeathers] = useState({});


  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7713b4d440ec83838555b87905cc8192`)
        .then(res => setShowWeathers(res.data));
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const [isDegrees, setisDegrees] = useState(true);

  console.log(showWeathers);

  return (
    <div><h2>Weather App</h2>
      <h4>{showWeathers.name}, {showWeathers.sys?.country}</h4>
      <div className='data'>
        <img src={`http://openweathermap.org/img/wn/${showWeathers.weather?.[0].icon}@2x.png`} alt="" />
        <ul><p>"{showWeathers.weather?.[0].description}"</p>
          <li><i className="fa-solid fa-wind"></i> Wind speed<b> {showWeathers.wind?.speed} m/s</b></li>
          <li><i className="fa-solid fa-cloud"></i> Clouds: <b>{showWeathers.main?.humidity} %</b></li>
          <li><i className="fa-solid fa-temperature-half"></i> Pressure: <b>{showWeathers.main?.pressure} mb</b></li>
        </ul>
      </div>
      <h5>{isDegrees ? ((showWeathers.main?.temp - 273.15)* 9/5 + 32).toFixed(1) : (showWeathers.main?.temp - 273.15).toFixed(1)} {isDegrees ? "°F" : "°C"}</h5>
      <button onClick={() => setisDegrees(!isDegrees)}>Degrees "°F/°C."</button>
    </div>
  );
};

export default Weathers;