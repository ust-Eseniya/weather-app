import React, { useEffect, useState } from "react";
import style from "./nowWeather.module.css";
import geolocation from "./geol.svg";
import Day from "../oneDay/oneDay.jsx";
import Current from "../current/current.jsx";
import Error from "../error/error.jsx";
import axios from "axios";

function Weather() {
  const [info, setInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState([]);
  const [option, setOption] = useState("now");
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(true);

  const urlBase = "https://api.openweathermap.org/data/2.5";
  let link;
  const uniqueDates = new Set();

  const handleSearch = (type) => {
    setSearch(type);
  };

  const handleButtonClick = () => {
    if (!city) {
      setError(true);
      return;
    }

    handleSearch("search");

    if (option === "now") {
      setUrl(
        `${urlBase}/weather?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`
      );
    } else if (option === "5days") {
      setUrl(
        `${urlBase}/forecast?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`
      );
    }

    setError(false);
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setInfo(response.data);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
      console.log(url);
    }
  }, [url]);

  const getCurrentLocation = () => {
    handleSearch("current");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);

        link = `${urlBase}/weather?lat=${latitude}&lon=${longitude}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`;
        setUrl(link);
      });
    } else {
      setError(true);
      console.error("Geolocation is not supported by this browser");
    }
  };

  const handleGetWeather = () => {
    getCurrentLocation();
  };

  const handleView = (option) => {
    setOption(option);
    if (search === "search") {
      if (option === "now") {
        link = `${urlBase}/weather?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`;
        setUrl(link);
      } else if (option === "5days") {
        link = `${urlBase}/forecast?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`;
        setUrl(link);
      }
    } else if (search === "current") {
      if (option === "now") {
        link = `${urlBase}/weather?lat=${location[0]}&lon=${location[1]}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`;
        setUrl(link);
      } else if (option === "5days") {
        link = `${urlBase}/forecast?lat=${location[0]}&lon=${location[1]}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`;
        setUrl(link);
      }
    }
  };

  return (
    <div>
      <div className={style.header}>
        {" "}
        <div className={style.geolocation}>
          <h3>
            {info
              ? info.name || (info.city && info.city.name) || inputValue
              : ""}
          </h3>
          <button
            className={`${style.btn} ${style.getLocation} `}
            onClick={() => {
              handleGetWeather();
            }}
          >
            <img
              className={style.geolocation__icon}
              src={geolocation}
              alt="geolocation"
            />
            By your current location
          </button>
          <p className={style.infoSearch}>
            {search === "search"
              ? `based on your search`
              : search === "current"
              ? `based on your location`
              : ""}
          </p>
        </div>
        <div className={style.inputContainer}>
          <input
            onChange={(event) => {
              console.log(event.target.value);
              setCity(event.target.value);
              setLocation(event.target.value);
              setInputValue(event.target.value);
            }}
            value={inputValue}
            className={style.inputContainer__input}
            type="text"
            placeholder="Location"
          />
          <button
            className={`${style.btn} ${style.searching} `}
            onClick={(event) => {
              handleButtonClick();
              event.preventDefault();
              if (option === "now") {
                setUrl(
                  `${urlBase}/weather?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`
                );
              } else if (option === "5days") {
                setUrl(
                  `${urlBase}/forecast?q=${city}&appid=496682d4b33c6e8a6ef861f9dfed7282&units=metric`
                );
              }
              setInputValue(" ");
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className={style.switcher}>
        <button
          className={`${style.switcherBtn} ${
            option === "5days" ? style.offBtn : ""
          }`}
          onClick={() => {
            handleView("now");
            console.log("changed to now");
          }}
        >
          <p>Now</p>
        </button>
        <span>|</span>
        <button
          className={`${style.switcherBtn}  ${
            option === "now" ? style.offBtn : ""
          }`}
          onClick={() => {
            handleView("5days");
            console.log("changed to 5 days");
          }}
        >
          <p>5 days</p>
        </button>
      </div>

      <div className={style.weather}>
        {error ? (
          <Error />
        ) : (
          <>
            {option === "now" && info && (
              <Current
                icon={
                  info &&
                  info.weather &&
                  info.weather[0] &&
                  info.weather[0].icon
                    ? `http://openweathermap.org/img/wn/${info.weather[0].icon}.png`
                    : "loading..."
                }
                temp={
                  info && info.main && info.main.temp
                    ? Math.round(info.main.temp)
                    : "..."
                }
                weather={
                  info &&
                  info.weather &&
                  info.weather[0] &&
                  info.weather[0].description
                    ? info.weather[0].description
                    : "..."
                }
                max={
                  info && info.main && info.main.temp_max
                    ? Math.round(info.main.temp_max)
                    : "..."
                }
                min={
                  info && info.main && info.main.temp_min
                    ? Math.round(info.main.temp_min)
                    : " "
                }
                up={
                  info && info.sys && info.sys.sunrise
                    ? new Date(info.sys.sunrise * 1000).toLocaleTimeString()
                    : "..."
                }
                down={
                  info && info.sys && info.sys.sunset
                    ? new Date(info.sys.sunset * 1000).toLocaleTimeString()
                    : "..."
                }
                feel={
                  info && info.main && info.sys.feels_like
                    ? Math.round(info.main.feels_like)
                    : "..."
                }
                humidity={
                  info && info.main && info.main.humidity
                    ? info.main.humidity
                    : "..."
                }
                wind={
                  info && info.wind && info.wind.speed ? info.wind.speed : "..."
                }
                pressure={
                  info && info.main && info.main.pressure
                    ? info.main.pressure
                    : "..."
                }
              />
            )}
          </>
        )}
        {error ? (
          <Error />
        ) : (
          <>
            {option === "5days" && info && info.list && (
              <section className={style.fiveDaysWeather}>
                {info.list && (
                  <div className={style.fiveDays}>
                    {info.list
                      .filter((forecast) => {
                        const date = new Date(
                          forecast.dt * 1000
                        ).toLocaleDateString();
                        if (!uniqueDates.has(date)) {
                          uniqueDates.add(date);
                          return true;
                        }
                        return false;
                      })
                      .map((forecast, index) => {
                        const date = new Date(
                          forecast.dt * 1000
                        ).toLocaleDateString();
                        const weather = forecast.weather[0].description;
                        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                        const minTemp = Math.round(forecast.main.temp_min);
                        const maxTemp = Math.round(forecast.main.temp_max);

                        return (
                          <Day
                            key={index}
                            icon={icon}
                            date={date}
                            weather={weather}
                            minTemp={minTemp}
                            maxTemp={maxTemp}
                          />
                        );
                      })}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
