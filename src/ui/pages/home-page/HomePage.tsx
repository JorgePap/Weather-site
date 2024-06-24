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
  setActiveCity,
  ForecastState,
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
  const forecastData: { [key: string]: ForecastState } =
    useAppSelector(selectForecastData);
  const autoCompleteData: IAutoComplete[] = useAppSelector(selectAutoComplete);
  const activeCityForecastObject = forecastData[activeCityData];

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const city = "Athens";
    if (!activeCityData) {
      dispatch(setActiveCity(city));
      dispatch(fetchWeather(city));
      dispatch(fetchForecast({ location: city, days: 3 }));
    }
    // dispatch(fetchAutoComplete("Lon"));
  }, [dispatch, activeCityData]);

  const formatTime = (isoTimeString?: string): string | undefined => {
    if (!isoTimeString) return undefined;
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
    activeCityForecastObject?.data?.forecast?.forecastday[0]?.astro?.sunrise ??
      "",
    activeCityForecastObject?.data?.forecast?.forecastday[0]?.astro?.sunset ??
      ""
  );

  const todaysMinTemp =
    activeCityForecastObject?.data?.forecast?.forecastday[0]?.day?.mintemp_c;
  const todaysMaxTemp =
    activeCityForecastObject?.data?.forecast?.forecastday[0]?.day?.maxtemp_c;

  console.log(activeCityForecastObject?.data?.forecast?.forecastday[3]?.date);

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
              {todaysMinTemp ? Math.round(todaysMinTemp) : undefined}
              &deg;/
              {todaysMaxTemp ? Math.round(todaysMaxTemp) : undefined}
              &deg;
            </div>
          </div>
          <div>
            <Warnings
              category={
                activeCityForecastObject?.data?.alerts?.alert[0]?.category
              }
              effective={formatTime(
                activeCityForecastObject?.data?.alerts?.alert[0]?.effective
              )}
              expires={formatTime(
                activeCityForecastObject?.data?.alerts?.alert[0]?.expires
              )}
            />
          </div>

          <FiveDaysForecast
            dayOne={
              weekday[
                new Date(
                  activeCityForecastObject?.data?.forecast?.forecastday[1]
                    ?.date ?? ""
                ).getDay()
              ]
            }
            minTempratureDayOne={
              activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
                ?.mintemp_c
            }
            maxTempratureDayOne={
              activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
                ?.maxtemp_c
            }
            dayTwo={
              weekday[
                new Date(
                  activeCityForecastObject?.data?.forecast?.forecastday[2]
                    ?.date ?? ""
                ).getDay()
              ]
            }
            minTempratureDayTwo={
              activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
                ?.mintemp_c
            }
            maxTempratureDayTwo={
              activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
                ?.maxtemp_c
            }
          />

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
                info={
                  activeCityForecastObject?.data?.forecast?.forecastday[0]
                    ?.astro?.sunset ?? 0
                }
              />
            ) : (
              <InfoBox
                title={"Sunrise"}
                info={
                  activeCityForecastObject?.data?.forecast?.forecastday[0]
                    ?.astro?.sunrise ?? 0
                }
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
