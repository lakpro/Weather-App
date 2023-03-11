import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    // axios.get().then((data) => {});
    const { data } = await axios.post(
      "http://localhost:3001/",
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
    <>
      <form>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          onChange={handleChange}
          value={city}
        />
        <button onClick={handleSubmit}>SUBMIT</button>
      </form>
      <div className="data">
        {!error && location && <h1>Location: {location} </h1>}
        {!error && !location && <h1>Location: - </h1>}
        {!error && weather && <h3>The weather is {weather}</h3>}
        {!error && !weather && <h3>The weather is -</h3>}
        {!error && temp && <h1>Current temperature is {temp} deg. celcius</h1>}
        {!error && !temp && <h1>Current temperature is - deg. celcius</h1>}
        {!error && url && <img src={url} />}
        {error && <h2>Please enter correct city</h2>}
      </div>
    </>
  );
}

export default App;
