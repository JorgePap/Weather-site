import { IWeather } from "@domain";
import { fetchWeather } from "@infrastructure";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchWeatherError, fetchWeatherSuccess } from "../slices";
import { AxiosError } from "axios";

function* weatherWorker (action:{type:string, payload:string}) {
    try{
        const location = action.payload
        const response: IWeather = yield call(fetchWeather, location) 
        console.log(response)
        yield put(fetchWeatherSuccess(response)) 
    }catch(error){
        yield put(fetchWeatherError(error as AxiosError)) 
    }
}

function* weatherWatcher() {
    yield takeEvery('weather/fetchWeather', weatherWorker)
}

export const weatherSaga = [weatherWatcher()];
