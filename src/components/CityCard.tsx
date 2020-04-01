import * as React from 'react'
import {WeatherEntityType} from "../types/utilsTypes";
import {FunctionComponent} from "react";
import {Avatar, Card} from '@shopify/polaris';
import './CityCardStyles.scss'


export interface Data{
    data:WeatherEntityType
}


export const CityCard:FunctionComponent<Data>=(props)=>{

    return(
        <Card>
            <Avatar source={`http://openweathermap.org/img/w/${props.data.weather[0]?.icon || '01d'}.png`} />
                <div className={'description_wrapper'}>
                    <h2 className={'description_title'}>
                        Weather in {props.data.name}
                    </h2>
                    <div className={'description_card'}>

                        <div className={'description_item_group'}>
                            <p className={'description_item'}>Country: <span className={'description_item_value'}>{props.data.sys.country}</span></p>
                            <p className={'description_item'}>Temp:<span className={'description_item_value'}>{props.data.main.temp}(Kelvin)</span></p>
                        </div>
                        <div className={'description_item_group'}>
                            <p className={'description_item'}>Feels like how <span className={'description_item_value'}>{props.data.main.feels_like}</span></p>
                            <p className={'description_item'}>Humidity <span className={'description_item_value'}>{props.data.main.humidity}</span></p>
                        </div>
                        <div className={'description_item_group'}>
                            <p className={'description_item'}>Wind speed:<span className={'description_item_value'}>{props.data.wind.speed}</span></p>
                            <p className={'description_item'}>Wind deg <span className={'description_item_value'}>{props.data.wind.deg}</span></p>
                            <p className={'description_item'}><span className={'description_item_value'}>{props.data.weather[0]?.description}</span></p>
                        </div>
                    </div>
                </div>


        </Card>
        )



}