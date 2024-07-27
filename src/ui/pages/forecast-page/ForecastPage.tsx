import {
  ForecastState,
  fetchForecast,
  selectActiveCityData,
  selectForecastData,
  useAppDispatch,
  useAppSelector,
} from "@application";
import { Slider } from "./components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@domain";
import { FaArrowLeft } from "react-icons/fa";

export const ForecastPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCityData: string = useAppSelector(selectActiveCityData);
  const forecastData: { [key: string]: ForecastState } =
    useAppSelector(selectForecastData);
  const activeCityForecastObject = forecastData[activeCityData];

  useEffect(() => {
    if (activeCityData) {
      dispatch(fetchForecast({ location: activeCityData, days: 3 }));
    }
  }, [dispatch, activeCityData]);

  // let dayOneAvgTemp: number = 0;
  // let dayTwoAvgTemp: number = 0;
  // if (
  //   activeCityForecastObject?.data?.forecast?.forecastday[1]?.day?.mintemp_c &&
  //   activeCityForecastObject?.data?.forecast?.forecastday[1]?.day?.maxtemp_c
  // ) {
  //   dayOneAvgTemp =
  //     (activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
  //       ?.mintemp_c +
  //       activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
  //         ?.maxtemp_c) /
  //     2;
  // }
  // if (
  //   activeCityForecastObject?.data?.forecast?.forecastday[2]?.day?.mintemp_c &&
  //   activeCityForecastObject?.data?.forecast?.forecastday[2]?.day?.maxtemp_c
  // ) {
  //   dayTwoAvgTemp =
  //     (activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
  //       ?.mintemp_c +
  //       activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
  //         ?.maxtemp_c) /
  //     2;
  // }
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex flex-col pb-12 w-full bg-black items-center text-white">
      <div className="flex flex-col self-start px-2 py-6 gap-2">
        <Link to={PATHS.HOME}>
          <FaArrowLeft />
        </Link>
        <h2 className="text-xl">2-Days Forecast</h2>
      </div>
      <div className="px-2 flex flex-col w-full items-center gap-20 min-h-screen max-w-screen-lg ">
        <div className="flex flex-col items-center gap-6">
          <p className="text-3xl">
            {activeCityForecastObject?.data?.location?.name}
          </p>
          <div className="flex gap-2">
            <p>
              {
                weekday[
                  new Date(
                    activeCityForecastObject?.data?.forecast?.forecastday[1]
                      ?.date ?? ""
                  ).getDay()
                ]
              }
            </p>
            <p>
              {activeCityForecastObject?.data?.forecast?.forecastday[1]?.date}
            </p>
          </div>
          <Slider
            extraClasses="max-w-[800px]"
            activeCityForecastObject={activeCityForecastObject}
            forecastday={1}
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-2">
            <p>
              {
                weekday[
                  new Date(
                    activeCityForecastObject?.data?.forecast?.forecastday[2]
                      ?.date ?? ""
                  ).getDay()
                ]
              }
            </p>
            <p>
              {activeCityForecastObject?.data?.forecast?.forecastday[1]?.date}
            </p>
          </div>
          <Slider
            extraClasses="max-w-[800px]"
            activeCityForecastObject={activeCityForecastObject}
            forecastday={2}
          />
        </div>
      </div>
    </div>
  );
};
