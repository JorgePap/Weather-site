import allCititesRefucer from './allCitiesSlice';
import activeCityReducer from './activeCitySlice';
import weatherReducer from './weatherSlice'
import forecastReducer from './forecastSlice'
import autoCompleteReducer from './autoCompleteSlice'

const rootReducer = {
    allCities: allCititesRefucer,
    activeCity: activeCityReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    autoComplete: autoCompleteReducer,
}

export default rootReducer;