import { IGetForecastRequest } from "@domain";
import httpClient from "./httpClient";

export const fetchForecast = async (requestParams:IGetForecastRequest) => {
    const apiKey = import.meta.env.VITE_API_KEY

    const {data} = await httpClient.get('/v1/forecast.json', {
    params: {
      key: apiKey,
      q: requestParams.location,
      days: requestParams.days,
      aqi: "yes",
      alerts: "yes",
    }
  })

  return data;
}