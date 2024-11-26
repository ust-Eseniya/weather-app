import React from "react";
import style from "./current.module.css";
import { Icon } from "@iconify/react";

function Current({
  icon,
  temp,
  weather,
  max,
  min,
  up,
  down,
  feel,
  humidity,
  wind,
  pressure,
}) {
  return (
    <section className={style.currentWeather}>
      <div className={style.main__upperContainer}>
        <img src={icon} alt={icon} width={"250px"} />
        <div className={style.main__tempWrapper}>
          <h1 className={style.main__temp}>{temp}°C</h1>
          <p>{weather}</p>
          <p>
            Max.: <span> {max}°</span>/Min.: <span> {min}°</span>
          </p>
          <p className={style.sunset}>
            <span>
              {" "}
              <Icon
                icon="mdi:weather-sunset-up"
                width={"20px"}
                color="white"
              />{" "}
              {up}
            </span>
            <span>
              {" "}
              <Icon
                icon="mdi:weather-sunset-down"
                width={"20px"}
                color="white"
              />{" "}
              {down}
            </span>
          </p>
        </div>
      </div>
      <section className={style.main__forecast}>
        <div className={style.details}>
          <div className={style.detail}>
            <p>
              <Icon icon="fluent-mdl2:historical-weather" width={"20px"} />:{" "}
              {feel}°
            </p>
          </div>
          <div className={style.detail}>
            <p>
              {" "}
              <Icon icon="mdi:weather-rainy" width={"20px"} />: {humidity}%
            </p>
          </div>
          <div className={style.detail}>
            <p>
              <Icon
                icon="fluent:weather-blowing-snow-48-filled"
                width={"20px"}
              />{" "}
              : {wind}km/h
            </p>
          </div>
          <div className={style.detail}>
            <p>
              <Icon icon="carbon:radar-weather" width={"20px"} />: {pressure}hPa
            </p>
          </div>
        </div>
        <div className={style.main__weather}>
          <div className={style.main__weatherDay}></div>
        </div>
      </section>
    </section>
  );
}

export default Current;
