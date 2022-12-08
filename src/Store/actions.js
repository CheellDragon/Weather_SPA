import axios from '../instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLatLon = createAsyncThunk('latLon', async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=74725725e7fb441b8816f16b1b6e3fab`);
    return response.data;
});

export const getWeather = createAsyncThunk('weather', async (latLon) => {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=GMT`);
    return response.data;
})
