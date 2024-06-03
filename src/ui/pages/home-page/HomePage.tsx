import { useEffect } from "react";
import styles from "./home-page.module.css";
import {
  fetchWeather,
  selectWeatherData,
  fetchForecast,
  selectForecastData,
  useAppDispatch,
  useAppSelector,
  selectAutoComplete,
  fetchAutoComplete,
  selectAllCitiesData,
  selectActiveCityData,
  addCity,
  setActiveCity,
} from "@application";
import { IAutoComplete, IForecast, IWeather, PATHS } from "@domain";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { AnimatedPage, FiveDaysForecast } from "@ui";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const allCitiesData: string[] = useAppSelector(selectAllCitiesData);
  const activeCityData: string = useAppSelector(selectActiveCityData);
  const weatherData: IWeather = useAppSelector(selectWeatherData);
  const forecastData: IForecast = useAppSelector(selectForecastData);
  const autoCompleteData: IAutoComplete[] = useAppSelector(selectAutoComplete);

  useEffect(() => {
    dispatch(addCity("Athens"));
    dispatch(setActiveCity("Athens"));
    dispatch(fetchWeather("Athens"));
    dispatch(fetchForecast({ location: "Athens", days: 5 }));
    // dispatch(fetchAutoComplete("Lon"));
  }, []);

  return (
    <AnimatedPage>
      <div
        className={[
          styles["container"],
          "py-2 px-8 flex flex-col w-full min-h-screen",
        ].join(" ")}
      >
        <div className="place-self-end">
          <Link to={PATHS.CITIESMANAGEMENT}>
            <CiSearch size="16px" />
          </Link>
        </div>
        <div className="flex flex-col gap-1 mb-5 gap items-left">
          <div className="self-center text-3xl font-light">
            {weatherData?.location?.name}
          </div>
          <div className="text-6xl">{weatherData?.current?.temp_c}&deg;</div>
          <div>
            {weatherData?.current?.condition.text}{" "}
            {Math.round(forecastData?.forecast?.forecastday[0]?.day?.mintemp_c)}
            &deg;/
            {Math.round(forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c)}
            &deg;
          </div>
        </div>
        <div>
          <FiveDaysForecast />
        </div>
        <div>other informations</div>
        <div>{autoCompleteData?.[0]?.name}</div>
      </div>
    </AnimatedPage>
  );
};
