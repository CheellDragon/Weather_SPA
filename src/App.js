import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLatLon, getWeather } from './Store/actions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    store.weather
    ? <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '100%', marginBottom: "15px" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2" gutterBottom>
        Weather Forecast
      </Typography>
      <TextField id="outlined-basic" label="City" variant="outlined" onChange={changeCity} />
      <Button onClick={getWeatherForecast} variant="outlined">Forecast Update</Button>
      <Typography variant="h4" gutterBottom>
        {store.weather.city.name} {
            store.weather.city.state
            ? <> - {store.weather.city.state}</>
            : null
          } - {store.weather.city.country}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 0, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {store.weather.weather.map((day, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>

              <Card sx={{ minWidth: 275 }}>
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
    : <></>
  );
}

export default App;
