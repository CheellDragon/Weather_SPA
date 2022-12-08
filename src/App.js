import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLatLon, getWeather } from './Store/actions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';

const App = () => {
  const [inputValue,setInputValue] = useState("London")
  const appDispatch = useDispatch();
  const store = useSelector(
    (state) => state,
    shallowEqual
  );

  const changeCity = (target) => {
    const cityName = target.currentTarget.value;
    setInputValue(cityName);
  };

  const getWeatherForecast = async () => {
    const latLon = appDispatch(getLatLon(inputValue));
    latLon.then(res => {
      const payload = {
        city: {
          name: res.payload[0].name,
          state: res.payload[0].state,
          country: res.payload[0].country
        },
        lat: res.payload[0].lat,
        lon: res.payload[0].lon,
      }
      appDispatch(getWeather(payload))
    })
  }

  useEffect(() => {
    getWeatherForecast();
  }, []);

  return (
    <div className='app'>
    { store.weather
    ? <Box
      component="form"
      sx={{ width: '90%', marginBottom: "15px", padding: 5, textAlign: "center" }}
    >
      <Typography variant="h2" gutterBottom>
        Weather Forecast
      </Typography>
      <TextField sx={{ width: "60%", marginRight: "10px" }} id="outlined-basic" label="City" variant="outlined" onChange={changeCity} />
      <Button sx={{ height: "55px", backgroundColor: "rgb(190,230,115)" }} onClick={getWeatherForecast} variant="outlined">Forecast Update</Button>
      <Typography sx={{ marginTop: "20px" }} variant="h4" gutterBottom>
        {store.weather.city.name} {
            store.weather.city.state
            ? <> - {store.weather.city.state}</>
            : null
          } - {store.weather.city.country}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{ padding: 5 }} spacing={{ xs: 0, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {store.weather.weather.map((day, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>

              <Card sx={{ minWidth: 275, backgroundColor: `rgb(${143 - 5 * index},${181 - 5 * index},${59 - 5 * index})` }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    
                  </Typography>
                  <Typography variant="h5" component="div">
                    {day.time}
                  </Typography>
                  <Typography variant="body2">
                    Temperature max: {day.temperature_max}
                    <br />
                    Temperature min: {day.temperature_min}
                    <br />
                    Precipitation sum: {day.precipitation_sum}
                    <br />
                    Wind Direction: {day.winddirection}
                    <br />
                    Wind Speed max: {day.windspeed}
                    <br />
                    Wind Gusts max: {day.windgusts}
                  </Typography>
                </CardContent>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    : <></> }
    </div>
  );
}

export default App;
