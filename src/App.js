import "./App.css";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setFirst(true), first);

  useEffect(() => {
    if (hour >= 5 && hour < 12) setGreeting("Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Afternoon");
    else setGreeting("Evening");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    // axios.get().then((data) => {});
    setIsLoading(true);
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
    setIsLoading(false);
    console.log(bg);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${bg})` }}>
      {!isLoading ? (
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
              autoComplete="off"
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
          </div>
          <div className="data2">
            {!first && error && (
              <h1 className="text">Please enter correct City</h1>
            )}
            {first && <h1 className="text">Please enter a City</h1>}
          </div>
        </div>
      ) : (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="box-s">
            <h1 style={{ width: "20vw" }}>
              <Skeleton />
            </h1>

            <form
              className="form-s"
              style={{ justifyContent: "space-between", marginTop: "20px" }}
            >
              <div className="inp-s">
                <h1>
                  <Skeleton height={50} />
                </h1>
              </div>
              <div className="inp-s">
                <h1>
                  <Skeleton height={50} />
                </h1>
              </div>
            </form>
            <div className="data-s" style={{ marginTop: "25px" }}>
              <h1 style={{ width: "20vw" }}>
                <Skeleton />
              </h1>
              <h2 style={{ width: "20vw" }}>
                <Skeleton />
              </h2>
              <h3 style={{ width: "20vw", marginBottom: "10px" }}>
                <Skeleton />
              </h3>
              <Skeleton circle={true} height={70} width={70} />
            </div>
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
}

export default App;
