import { IAutoComplete } from '@domain';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from 'axios';
import { RootState } from '../configureStore';

interface AutoCompleteState {
    data: IAutoComplete[] | null,
    loading: boolean,
    error: AxiosError | null
}

const initialState: AutoCompleteState = {
    data: null,
    loading: false,
    error: null,
}

export const autoCompleteSlice = createSlice({
    name: 'autoComplete',
    initialState,
    reducers: {
        fetchAutoComplete: (state, action: PayloadAction<string>) => {
            state.loading = true
        },
        fetchAutoCompleteSuccess: (state, action: PayloadAction<IAutoComplete[]>) => {
            state.loading = false,
            state.data = action.payload,
            state.error = initialState.error
        },
        fetchAutoCompleteError: (state, action: PayloadAction<AxiosError>) => {
            state.loading = false,
            state.data = initialState.data,
            state.error = action.payload
        },
    },
});

export const { fetchAutoComplete,fetchAutoCompleteSuccess,fetchAutoCompleteError } = autoCompleteSlice.actions;

export const selectAutoComplete = (state: RootState) => state.autoComplete.data
export const selectAutoCompleteLoading = (state: RootState) => state.autoComplete.loading  
export const selectAutoCompleteError = (state: RootState) => state.autoComplete.error

export default autoCompleteSlice.reducer;