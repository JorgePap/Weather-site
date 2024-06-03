import { IAutoComplete } from "@domain";
import { fetchAutoComplete } from "@infrastructure";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchAutoCompleteError, fetchAutoCompleteSuccess } from "../slices";
import { AxiosError } from "axios";

function* autoCompleteWorker (action:{type:string, payload:string}) {
    try{
        const location = action.payload
        const response: IAutoComplete[] = yield call(fetchAutoComplete, location)
        yield put(fetchAutoCompleteSuccess(response))
    }catch(error){
        yield put(fetchAutoCompleteError(error as AxiosError))
    }
}

function* autoCompleteWatcher() {
    yield takeEvery('autoComplete/fetchAutoComplete', autoCompleteWorker)
}

export const autoCompleteSaga = [autoCompleteWatcher()];