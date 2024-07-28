import { IWeather } from '@domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../configureStore';

interface WeatherState {
  data: IWeather | null,
  loading: boolean,
  error: AxiosError | null,
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeather: (state, _action: PayloadAction<string>) => {
      state.loading = true
    },
    fetchWeatherSuccess: (state, action: PayloadAction<IWeather>) => {
      state.loading = false,
      state.data = action.payload,
      state.error = initialState.error
    },
    fetchWeatherError: (state, action: PayloadAction<AxiosError>) => {
      state.loading = false,
      state.data = initialState.data,
      state.error = action.payload
    },
  },
});

export const { fetchWeather,fetchWeatherSuccess,fetchWeatherError } = weatherSlice.actions;

export const selectWeatherData = (state: RootState) => state.weather.data
export const selectWeatherLoading = (state: RootState) => state.weather.loading  
export const selectWeatherError = (state: RootState) => state.weather.error  

export default weatherSlice.reducer;