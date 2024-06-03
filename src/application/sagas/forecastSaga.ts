import { IForecast, IGetForecastRequest } from "@domain";
import { fetchForecast } from "@infrastructure";
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosError } from "axios";
import { fetchForecastError, fetchForecastSuccess } from "../slices";



function* forecastWorker (action:{type:string, payload:IGetForecastRequest}) {
    try{
        const requestParams = action.payload
        const response: IForecast = yield call(fetchForecast, requestParams) 
        yield put(fetchForecastSuccess(response)) 
    }catch(error){
        yield put(fetchForecastError(error as AxiosError)) 
    }
}

function* forecastWatcher() {
    yield takeEvery('forecast/fetchForecast', forecastWorker)
}

export const forecastSaga = [forecastWatcher()];
