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
import { AnimatedPage, FiveDaysForecast, InfoBox, Warnings } from "@ui";

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

  const formatTime = (isoTimeString: string): string => {
    const date = new Date(isoTimeString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const shouldShowSunset = (
    currentTime: string,
    sunriseTime: string,
    sunsetTime: string
  ): boolean => {
    return currentTime >= sunriseTime && currentTime < sunsetTime;
  };

  const showSunset = shouldShowSunset(
    weatherData?.location?.localtime,
    forecastData?.forecast?.forecastday[0]?.astro?.sunrise,
    forecastData?.forecast?.forecastday[0]?.astro?.sunset
  );

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
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col gap-1 gap items-left">
            <div className="self-center text-3xl font-light">
              {weatherData?.location?.name}
            </div>
            <div className="text-6xl">{weatherData?.current?.temp_c}&deg;</div>
            <div>
              {weatherData?.current?.condition.text}{" "}
              {Math.round(
                forecastData?.forecast?.forecastday[0]?.day?.mintemp_c
              )}
              &deg;/
              {Math.round(
                forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c
              )}
              &deg;
            </div>
          </div>
          <div>
            <Warnings
              category={forecastData?.alerts?.alert[0]?.category}
              effective={formatTime(forecastData?.alerts?.alert[0]?.effective)}
              expires={formatTime(forecastData?.alerts?.alert[0]?.expires)}
            />
          </div>
          <div>
            <FiveDaysForecast />
          </div>
          <div className="grid grid-cols-3 auto-cols-min w-max self-center gap-4">
            <InfoBox title={"UV"} info={weatherData?.current?.uv} />
            <InfoBox
              title={"Humidity"}
              info={weatherData?.current?.humidity}
              unit="percentage"
            />
            <InfoBox
              title={"Real feel"}
              info={weatherData?.current?.feelslike_c}
              unit="celsius"
            />
            <InfoBox
              title={"Wind"}
              info={`${weatherData?.current?.wind_kph} ${weatherData?.current?.wind_dir}`}
            />
            {showSunset ? (
              <InfoBox
                title={"Sunset"}
                info={forecastData?.forecast?.forecastday[0]?.astro?.sunset}
              />
            ) : (
              <InfoBox
                title={"Sunrise"}
                info={forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
              />
            )}
            <InfoBox
              title={"Pressure"}
              info={`${weatherData?.current?.pressure_mb} mbar`}
            />
          </div>
        </div>
        <div>{autoCompleteData?.[0]?.name}</div>
      </div>
    </AnimatedPage>
  );
};
