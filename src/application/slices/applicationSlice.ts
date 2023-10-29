import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  temperature: number;
}

const initialState: WeatherState = {
  temperature: 0,
};

export const applicationSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
  },
});

export const { setTemperature } = applicationSlice.actions;
export default applicationSlice.reducer;