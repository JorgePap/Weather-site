import { all } from "redux-saga/effects";
import { weatherSaga } from "./weatherSaga";
import { forecastSaga } from './forecastSaga'
import { autoCompleteSaga } from "./autoCompleteSaga";


export default function* rootSaga() {
  yield all([
    ...weatherSaga,
    ...forecastSaga,
    ...autoCompleteSaga
  ]);
}
