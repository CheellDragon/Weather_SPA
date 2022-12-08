import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLatLon, getWeather, getCountries } from './Store/actions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [inputValue,setInputValue] = useState({
    city: "London",
    country: "GB",
  })
  const appDispatch = useDispatch();
  const store = useSelector(
    (state) => state,
    shallowEqual
  );

  const changeCity = (target) => {
    const cityName = target.currentTarget.value
    setInputValue({
      ...inputValue,
      city: cityName,
    })
  }

  const changeCountry = (target) => {
    const countryName = target.currentTarget.value
    setInputValue({
      ...inputValue,
      country: countryName,
    })
  }

  const loadCountries = () => {
    appDispatch(getCountries())
  }

  const getWeatherForecast = async () => {
    const latLon = appDispatch(getLatLon(inputValue.city));
    latLon.then(res => {
      appDispatch(getWeather({
        lat: res.payload[0].lat,
        lon: res.payload[0].lon,
      }))
    })
  }

  useEffect(() => {
    getWeatherForecast();
    loadCountries();
  },[]);

  console.log(store);
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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={store.countries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <TextField id="outlined-basic" label="City" variant="outlined" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 0, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {store.weather.map((day, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>{day.time}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    : <></>
  );
}

export default App;
