import axios from '../instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getWeather = createAsyncThunk('/', async () => {
    const response = await axios.get('/');
    return response.data;
});
