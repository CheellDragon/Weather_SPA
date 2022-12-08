import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLatLon, getWeather } from './Store/actions';

const App = () => {
  const [inputValue,setInputValue] = useState({
    city: "London",
    country: "Great Britain",
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
    getWeatherForecast()
  },[]);

  console.log(store);
  return (
    <></>
  );
}

export default App;
