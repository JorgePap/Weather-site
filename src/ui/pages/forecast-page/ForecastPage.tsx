import {
  ForecastState,
  fetchForecast,
  selectActiveCityData,
  selectForecastData,
  useAppDispatch,
  useAppSelector,
} from "@application";
import { OneDayForecast } from "./components";
import { useEffect } from "react";

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

  let dayOneAvgTemp: number = 0;
  let dayTwoAvgTemp: number = 0;
  if (
    activeCityForecastObject?.data?.forecast?.forecastday[1]?.day?.mintemp_c &&
    activeCityForecastObject?.data?.forecast?.forecastday[1]?.day?.maxtemp_c
  ) {
    dayOneAvgTemp =
      (activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
        ?.mintemp_c +
        activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
          ?.maxtemp_c) /
      2;
  }
  if (
    activeCityForecastObject?.data?.forecast?.forecastday[2]?.day?.mintemp_c &&
    activeCityForecastObject?.data?.forecast?.forecastday[2]?.day?.maxtemp_c
  ) {
    dayTwoAvgTemp =
      (activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
        ?.mintemp_c +
        activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
          ?.maxtemp_c) /
      2;
  }

  return (
    <div className="px-2 py-6 flex flex-col w-full items-center gap-10 min-h-screen bg-black text-white">
      <OneDayForecast
        day={activeCityForecastObject?.data?.forecast?.forecastday[1]?.date}
        minTemp={
          activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
            ?.mintemp_c
        }
        maxTemp={
          activeCityForecastObject?.data?.forecast?.forecastday[1]?.day
            ?.maxtemp_c
        }
        avgTemp={dayOneAvgTemp}
      />
      <OneDayForecast
        day={activeCityForecastObject?.data?.forecast?.forecastday[2]?.date}
        minTemp={
          activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
            ?.mintemp_c
        }
        maxTemp={
          activeCityForecastObject?.data?.forecast?.forecastday[2]?.day
            ?.maxtemp_c
        }
        avgTemp={dayTwoAvgTemp}
      />
    </div>
  );
};
