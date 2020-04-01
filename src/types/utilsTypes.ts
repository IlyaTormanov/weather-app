import {GeoLocationSensorState} from "react-use/esm/useGeolocation";

export type intermediateGeolocationType = Pick<GeoLocationSensorState, 'latitude' | 'longitude'>

export interface WeatherShortDescription {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface WeatherFeels {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

export interface Sys {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

export interface CityEntity {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
  address: {
    suburb: string,
    city: string,
    county: string,
    state: string,
    country: string,
    country_code: string,
  }

}

const getCityName = (address: CityAddress): string => {
  return address.city || address.town || address.village || ''
};

export type CityAddress = {
  suburb: string,
  city?: string,
  town?: string,
  village?: string,
  county: string,
  state: string,
  country: string,
  country_code: string,
}

export interface WeatherEntityType {
  coord: { lon: number, lat: number },
  weather: WeatherShortDescription[],
  base: string,
  main: WeatherFeels,
  visibility: number,
  wind: { speed: number, deg: number },
  clouds: { all: number },
  dt: number,
  sys: Sys,
  timezone: number,
  id: number,
  name: string,
  cod: number,
}
