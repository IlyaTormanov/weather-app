import {GET_CITY_LIST, GET_CURRENT_CITY_WEATHER} from "./Actions/actions";
import {ActionType, StateType} from "typesafe-actions";
import {cityListReducer, currentWeatherCityReducer} from "./Reducers/reducers";
import {combineReducers} from "redux";

export const RootAction={
  currentCityWeather:GET_CURRENT_CITY_WEATHER,
  cityList:GET_CITY_LIST
}

export type RootActionType=ActionType<typeof RootAction>
export const RootReducer=combineReducers({
  currentCityWeather:currentWeatherCityReducer,
  cityList:cityListReducer
})



export type RootStateType=StateType<typeof RootReducer>