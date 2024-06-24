import { combineReducers } from '@reduxjs/toolkit';
import allCititesReducer from './allCitiesSlice';
import activeCityReducer from './activeCitySlice';
import weatherReducer from './weatherSlice'
import forecastReducer from './forecastSlice'
import autoCompleteReducer from './autoCompleteSlice'

const rootReducer = combineReducers({
    allCities: allCititesReducer,
    activeCity: activeCityReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    autoComplete: autoCompleteReducer,
})

export default rootReducer;