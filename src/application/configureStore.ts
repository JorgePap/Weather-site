import { configureStore, Store } from '@reduxjs/toolkit';
import weatherReducer  from './slices/applicationSlice';

export const store: Store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;