import { createSlice } from '@reduxjs/toolkit';
import { getLatLon, getWeather } from './actions';

const initialState = {
    weather: null,
    loading: false,
};

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLatLon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLatLon.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(getWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = action.payload;
        });
        builder.addCase(getWeather.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default slice.reducer;
