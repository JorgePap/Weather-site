import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../configureStore';

interface AllCitiesState {
    data: string[] 
}

const initialState: AllCitiesState = {
    data: ["Athens"], // Initialize with Athens
}

export const allCitiesSlice = createSlice({
    name: 'allCities',
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<string>) => {
            if (!state.data.includes(action.payload)) {
                state.data.push(action.payload);
              }
        },
        removeCity: (state, action: PayloadAction<string>) => {
            if (state.data.includes(action.payload)) {
                state.data = state.data?.filter(city => city !== action.payload)
            }
            
        },
    },
},);

export const { addCity, removeCity } = allCitiesSlice.actions;

export const selectAllCitiesData = (state: RootState) => state.allCities.data;

export default allCitiesSlice.reducer;