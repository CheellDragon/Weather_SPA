import axios from '../instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLatLon = createAsyncThunk('latLon', async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=74725725e7fb441b8816f16b1b6e3fab`);
    return response.data;
});

export const getWeather = createAsyncThunk('weather', async (latLon) => {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&timezone=GMT`);
    const daily = response.data.daily
    const weather = daily.precipitation_sum.map((precipitation_sum,i) => {
        return {
            temperature_max: daily.temperature_2m_max[i],
            temperature_min: daily.temperature_2m_min[i],
            precipitation_sum,
            time: new Date(daily.time[i]).toLocaleString("en-US",{weekday: "long", month: "long", day: "numeric"}),
            windspeed: daily.windspeed_10m_max[i],
            windgusts: daily.windgusts_10m_max[i],
            winddirection: daily.winddirection_10m_dominant[i],
        }
    })
    return {
        weather,
        city: latLon.city
    };
})
