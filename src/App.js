import "./App.css";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const [city, setCity] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(true);
  const [first, setFirst] = useState(true);
  const [placeholder, setPlaceholder] = useState("Enter City");
  const [hour, setHour] = useState(new Date().getHours());
  const [greeting, setGreeting] = useState();
  const [bg, setBg] = useState("/pics/welcome.jpg");

  // const styles = {
  //   if(weather) {
  //     backgroundImage: url("clouds-bg.jpg")
  //   }else if(weather) {
  //     backgroundImage: url("clouds-bg.jpg")
  //   }
  // };

  // useEffect(() => {
  //   if (weather) {
  //     setBg("clouds-bg.jpg");
  //   } else if (weather) {
  //     setBg("clouds-bg.jpg");
  //   }
  // }, weather);

  useEffect(() => setFirst(true), first);

  // useEffect(() => {
  //   document.getElementsByClassName(
  //     "data"
  //   ).style.backgroundImage = `url(${bg})`;
  // }, bg);

  useEffect(() => {
    if (hour >= 5 && hour < 12) setGreeting("Morning");
    else if (hour >= 12 && hour < 5) setGreeting("After");
    else setGreeting("Evening");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    // axios.get().then((data) => {});
    const { data } = await axios.post(
      "https://weather-app-server-yolm.onrender.com/",
      {
        name: city,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(data);

    setWeather(data.weather);
    setLocation(data.location);
    setUrl(data.imgUrl);
    setTemp(data.temp);
    setError(data.error);
    console.log(location);
    setFirst(false);
    setCity("");
    setPlaceholder(() => {
      return data.error ? "Error" : data.location;
    });
    setBg(() => {
      return data.error ? `/pics/welcome.jpg` : `/pics/${data.icon}.jpg`;
    });

    console.log(bg);
    // document.getElementsByClassName(
    //   "data"
    // ).style.backgroundImage = `url(${bg})`;
    // axios
    //   .post("http://localhost:3001/", {
    //     name: event.target.name,
    //   })
    //   .then((res) => {
    //     console.log("SUCCESS!!");
    //   });
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${bg})` }}>
      <div className="box">
        <h1>Hey, Good {greeting}</h1>
        {(error || first) && (
          <p className="greeting">WELCOME TO THE WEATHER APP!!</p>
        )}
        <form className="form">
          <input
            className="input"
            type="text"
            name="city"
            placeholder={placeholder}
            onChange={handleChange}
            value={city}
          />
          <button className="btn" onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
        <div className="data">
          {!error && location && <h1>Location: {location} </h1>}
          {!error && weather && <h2>Weather: {weather}</h2>}
          {!error && temp && <h3>Temp: {temp}°C</h3>}
          {!error && url && <img className="img" src={url} />}
          {!first && error && (
            <h1 className="text">Please enter correct City</h1>
          )}
          {first && <h1 className="text">Please enter a City</h1>}
        </div>
      </div>
    </div>
  );
}

export default App;
