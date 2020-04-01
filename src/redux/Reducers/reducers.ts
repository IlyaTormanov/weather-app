import {createReducer, StateType} from "typesafe-actions";
import {cityLIstType, GET_CITY_LIST, GET_CURRENT_CITY_WEATHER, getCurrentCityWeatherType} from "../Actions/actions";
import {CityAddress, CityEntity, WeatherEntityType,} from "../../types/utilsTypes";
import {initState} from "../../global";
import {OptionDescriptor} from "@shopify/polaris/types/components/OptionList";


export const currentWeatherCityReducer=createReducer<WeatherEntityType,getCurrentCityWeatherType>(initState)
.handleAction(GET_CURRENT_CITY_WEATHER.success,(state,action)=>action.payload)


export type currentWeatherReducerType=StateType<typeof currentWeatherCityReducer>


export const cityListReducer=createReducer<OptionDescriptor[],cityLIstType>([] as OptionDescriptor[])
.handleAction(GET_CITY_LIST.success,(state,action)=>action.payload.map(item=>({value:item.address.city,label:item.address.city}))
)

export type cityListReducerType=StateType<typeof cityListReducer>