import { IGetForecastRequest } from "@domain";
import httpClient from "./httpClient";

export const fetchForecast = async (requestParams:IGetForecastRequest) => {
    const {data} = await httpClient.get('/v1/forecast.json', {
    params: {
      key: 'c3f2c186ec8b42dc8d4105328230411',
      q: requestParams.location,
      days: requestParams.days,
      aqi: "yes",
    }
  })

  return data;
}