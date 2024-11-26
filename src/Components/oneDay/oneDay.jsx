import React from "react";
import style from "./oneDay.module.css";
import { Icon } from "@iconify/react";

function Day({ key, icon, date, weather, minTemp, maxTemp }) {
  return (
    <div key={key} className={style.day}>
      <div className={style.typeSection}>
        <Icon icon={icon} width={"25px"} />
        <div className={style.typeWeather}>
          <h2>{date}</h2>
          <p>{weather}</p>
        </div>
      </div>
      <div className={style.daysTemp}>
        <p className={style.dayTemp}>
          {minTemp}° / {maxTemp}°
        </p>
      </div>
    </div>
  );
}

export default Day;
