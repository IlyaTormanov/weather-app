import {WeatherEntityType} from "./types/utilsTypes";

export const initState:WeatherEntityType={
  coord:{lon: 0, lat: 0},
  weather: [],
  base: "",
  main: {
    temp:0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0
  },
  visibility: 0,
  wind: {speed: 0, deg: 0},
  clouds: {all: 0},
  dt:0,
  sys:{
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
}




export const api_key_owm='8d7d34294739f7a5720fbf22f5dc1a90';