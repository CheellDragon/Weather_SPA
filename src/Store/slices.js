import { createSlice } from '@reduxjs/toolkit';
import { getWeather } from './actions';

const initialState = {
    weather: null,
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'sclice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWeather.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = action.payload;
        });
        builder.addCase(getWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default slice.reducer;
