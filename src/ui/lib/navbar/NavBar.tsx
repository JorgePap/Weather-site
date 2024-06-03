import { selectWeatherData, useAppSelector } from "@application";
import { IWeather, PATHS } from "@domain";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";

export const NavBar: React.FC = () => {
  const weatherData: IWeather = useAppSelector(selectWeatherData);

  return (
    <header className={[[styles.container], ""].join(" ")}>
      <Link to={PATHS.CITIESMANAGEMENT}>
        <IoMdArrowBack size="16px" />
      </Link>
      <div>{weatherData?.location?.name}</div>
      <button>
        <CiSearch size="16px" />
      </button>
    </header>
  );
};
