import { IForecast, IGetForecastRequest } from '@domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../configureStore';

interface ForecastState {
  data: IForecast | null,
  loading: boolean,
  error: AxiosError | null,
}

const initialState: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    fetchForecast: (state, action: PayloadAction<IGetForecastRequest>) => {
      state.loading = true
    },
    fetchForecastSuccess: (state, action: PayloadAction<IForecast>) => {
      state.loading = false,
      state.data = action.payload,
      state.error = initialState.error
    },
    fetchForecastError: (state, action: PayloadAction<AxiosError>) => {
      state.loading = false,
      state.data = initialState.data,
      state.error = action.payload
    },
  },
});

export const { fetchForecast,fetchForecastSuccess,fetchForecastError } = forecastSlice.actions;

export const selectForecastData = (state: RootState) => state.forecast.data
export const selectForecastLoading = (state: RootState) => state.forecast.loading  
export const selectForecastError = (state: RootState) => state.forecast.error  

export default forecastSlice.reducer;