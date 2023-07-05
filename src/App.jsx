import React, { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const apiKey = "";

  /*
  USEEFFECT!!!!

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // prevent refresh

    if (!city) {
      setWeatherData(null); // Clear previous weather data if city name is empty
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` // fetch weather data
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }

    setLoading(false);
  };
  */
  useEffect(() => {
    const fetchData = async () => {
      if (!city) {
        setWeatherData(null); // Clear previous weather data if city name is empty
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` // fetch weather data
        );
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setWeatherData(null);
          console.log("Error fetching weather data:", data.message);
        }
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [city, apiKey]);

  return (
    <div>
      <form>
        Input Location:<input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        {/*<button type="submit">Get Weather</button>*/}
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {weatherData && weatherData.cod === "404" ? ( // check if location searched no data // sample output if not found: {"cod":"404","message":"city not found"} from https://api.openweathermap.org/data/2.5/weather?q=fsdfsdfd&appid=9c91e5a91ce7cdc6e8c4c8700e06e925
            <p>Data not found. Please enter a valid city name.</p>
          ) : (
            <>
              {weatherData && ( // with data output or weatherData.cod === '200' //sample output {"coord":{"lon":122.5644,"lat":10.6969},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":299.58,"feels_like":299.58,"temp_min":299.58,"temp_max":299.58,"pressure":1011,"humidity":85,"sea_level":1011,"grnd_level":1010},"visibility":10000,"wind":{"speed":2.8,"deg":19,"gust":4.19},"clouds":{"all":100},"dt":1688480438,"sys":{"country":"PH","sunrise":1688419910,"sunset":1688465752},"timezone":28800,"id":1711005,"name":"Iloilo City","cod":200}
                <>
                  <h1>{weatherData.name}</h1> {/** city name*/}
                  <p>
                    {weatherData.weather[0].main} :{" "}
                    {weatherData.weather[0].description}{" "}
                    {/** main weather status and desc*/}
                  </p>
                  <p>Humidity: {weatherData.main.humidity} %</p>{" "}
                  {/** humidity*/}
                  <p>
                    Wind Speed: {(weatherData.wind.speed * 3.6).toFixed(2)}{" "}
                    km/hr
                  </p>{" "}
                  {/** convert m/s to km/hr*/}
                  <p>
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}{" "}
                    °C
                  </p>{" "}
                  {/** convert kelvin to celcius*/}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
