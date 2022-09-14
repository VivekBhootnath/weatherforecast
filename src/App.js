import React from 'react'
import { useState } from 'react'
// import "./style/Weather.css"
import axios from 'axios'
import './App.css'
import CountUp from 'react-countup';

function App() {

  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  // const apiKey = process.env.REACT_APP_APIKEY;
  const apiKey = "88b1f82c0b0bcdccfe51024a8b5ed9a6";

  const apiCall = async (e) => {
    e.preventDefault()
    const loc = e.target.elements.loc.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
    const req = axios.get(url);
    const res = await req;
    setWeather({
      descp: res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      humidity: res.data.main.humidity,
      press: res.data.main.pressure,
    })

    setCity(res.data.name)

  }

  //Converting K to C
  let k = weather.temp;
  let C = k - 273.15

  const Weath = () => {
    return <div>
      <div className="winfo">
        Weather information for <span>{city}</span>
        <hr></hr>
      </div>
      <div className="Weath">
        <div className="welement">
          Weather : {weather.descp}
        </div>
        <div className="welement">
          Temperature :<CountUp duration={1.00} start={0} end={C.toFixed(2)} />  &#8451;
        </div>
        <div className="welement">
          Humidity :<CountUp duration={1.50} start={0} end={weather.humidity}/> % 
        </div>
        <div className="welement">
          Pressure : <CountUp duration={2.00} start={0} end= {weather.press} />mb
        </div>
      </div>
    </div>
  }
  return (


    <div className='App-header'>

      <h2 className="weathhead">WEATHER INFO</h2>
     
      <form onSubmit={apiCall} className="form">
        <input type="text"
          placeholder="city"
          name="loc" />
        <button className="bttn">Search</button>
      </form>

      {weather && <Weath />}
    </div>
  )
}

export default App