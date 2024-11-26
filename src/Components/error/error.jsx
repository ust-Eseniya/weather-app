import React from "react";
import style from "./error.module.css";

export default function Error() {
  return (
    <div className={style.errorContainer}>
      <h2>
      Пожалуйста, укажите свое местоположение на карте или введите название города для поиска
      информации о погоде.
      </h2>
    </div>
  );
}
