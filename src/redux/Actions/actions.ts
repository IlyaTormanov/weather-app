import {ActionType, createAsyncAction} from "typesafe-actions";
import {CityAddress, CityEntity, intermediateGeolocationType, WeatherEntityType} from "../../types/utilsTypes";

export const GET_CURRENT_CITY_WEATHER = createAsyncAction(
    'GET_CURRENT_CITY_WEATHER_REQUEST',
    'GET_CURRENT_CITY_WEATHER_SUCCESS',
    'GET_CURRENT_CITY_WEATHER_FAILURE'
)<intermediateGeolocationType, WeatherEntityType,undefined>()
export type getCurrentCityWeatherType=ActionType<typeof GET_CURRENT_CITY_WEATHER>

export const GET_CITY_LIST=createAsyncAction(
    'CITY_LIST_REQUEST',
    'CITY_LIST_SUCCESS',
    'CITY_LIST_FAILURE'
)<string,CityEntity[],undefined>()
export type cityLIstType=ActionType<typeof  GET_CITY_LIST>
