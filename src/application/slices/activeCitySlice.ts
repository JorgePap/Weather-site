import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../configureStore';

interface ActiveCityState {
    data: string
}

const initialState: ActiveCityState ={
    data: '',
}

export const activeCitySlice = createSlice({
    name: 'activeCity',
    initialState,
    reducers: {
        setActiveCity: (state, action: PayloadAction<string>) => {
            state.data = action.payload
        },
    },
},);

export const { setActiveCity } = activeCitySlice.actions;

export const selectActiveCityData = (state: RootState) => state.activeCity.data

export default activeCitySlice.reducer;