import { IForecast, IGetForecastRequest } from '@domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../configureStore';

export interface ForecastState {
  data: IForecast | null,
  loading: boolean,
  error: AxiosError | null,
}

const initialRecord: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

// Record<string, ForecastState>
const initialState: {[key: string]: ForecastState} = {

}

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    fetchForecast: (state, action: PayloadAction<IGetForecastRequest>) => {
      return {...state, [action.payload.location]: {...state[action.payload.location], loading: true}}
    },
    fetchForecastSuccess: (state, action: PayloadAction<{data: IForecast, location: string}>) => {
      return {...state, [action.payload.location]: {data: action.payload.data, error: initialRecord.error, loading: initialRecord.loading}}
    },
    fetchForecastError: (state, action: PayloadAction<{error: AxiosError, location: string}>) => {
      return {...state, [action.payload.location]: {data: initialRecord.data, error: action.payload.error, loading: initialRecord.loading}}
    },
  },
});

export const { fetchForecast,fetchForecastSuccess,fetchForecastError } = forecastSlice.actions;

export const selectForecastData = (state: RootState) => state.forecast
export const selectForecastCityData = (state: RootState, key:string) => state.forecast[key].data
export const selectForecastLoading = (state: RootState) => state.forecast 
export const selectForecastError = (state: RootState) => state.forecast 

export default forecastSlice.reducer;