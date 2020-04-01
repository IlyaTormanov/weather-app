import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { useGeolocation, useUpdateEffect} from 'react-use';
import {RootAction, RootStateType} from "./redux/root";
import {api_key_owm} from "./global";
import {CityEntity, WeatherEntityType} from "./types/utilsTypes";
import {CityCard} from "./components/CityCard";
import {Autocomplete, Button, ButtonGroup,  Stack} from "@shopify/polaris";
import {uniq} from 'fp-ts/es6/Array';
import {fromEquals} from "fp-ts/es6/Eq";
import './AppStyles.scss'
import CloseIcon from "mdi-react/CloseIcon";
import {  useThrottle } from 'react-use';

export enum NotificationState {
  never = 'never',
  hide = 'hide',
  show = 'show'
}

export const storageNotification = JSON.parse(localStorage.getItem('notificationState') as string)
export const storageFavoriteList = JSON.parse(localStorage.getItem('city') as string)

const FavouriteEq = fromEquals((a: string, b: string) => a === b);

function App() {
  const location = useGeolocation({enableHighAccuracy: true});

  const [favoriteList, setFavoriteList] = useState<string[]>(storageFavoriteList);
  const [typingValue, setTypingValue] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showAlways, setShowAlways] = useState<NotificationState>(storageNotification ? storageNotification : NotificationState.hide);

  const throttledValue = useThrottle(typingValue, 200);

  const dispatch = useDispatch();
  const cityWeather = useSelector((state: RootStateType) => state.currentCityWeather);
  const cityList = useSelector((state: RootStateType) => state.cityList);

  useEffect(() => {
    location.longitude && axios.get<WeatherEntityType>(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${api_key_owm}&units=metric`)
        .then((res) => {
          dispatch(RootAction.currentCityWeather.success(res.data))
        })
  }, [location.longitude, location.latitude, dispatch]);


  useEffect(() => {
    axios.get<CityEntity[]>(`https://nominatim.openstreetmap.org/search?city=${typingValue}&format=json&addressdetails=[1]&accept-language=en-US`).then((res) => {
      dispatch(RootAction.cityList.success(res.data))
    })
  }, [throttledValue, dispatch]);


  const textField = (
      <Autocomplete.TextField onChange={setTypingValue} label={'Select a city to view the weather'}
                              placeholder={'Search...'} value={typingValue}/>
  );


  const addToFavorites = useCallback(() => {
    setFavoriteList(prevState => uniq(FavouriteEq)([...prevState, ...selected]))
    setShowAlways(NotificationState.hide)
  }, [favoriteList, selected]);

  useEffect(()=>{
    localStorage.setItem('city', JSON.stringify(favoriteList))
  },[favoriteList])


  const turnOffNotifications = (): void => {
    setShowAlways(NotificationState.never);
    localStorage.setItem('notificationState', JSON.stringify(NotificationState.never))
  };
  const removeFromFavoriteList=useCallback((item:string)=>{
    setFavoriteList(prevState => prevState.filter(favourite=>favourite!==item))
  },[favoriteList])



   useUpdateEffect(() => {
    axios.get<WeatherEntityType>(`https://api.openweathermap.org/data/2.5/weather?q=${selected[0]}&appid=${api_key_owm}&units=metric`)
        .then((res: any) => {
          dispatch(RootAction.currentCityWeather.success(res.data))
        });
    showAlways !== NotificationState.never && setShowAlways(NotificationState.show);
    setTypingValue('')
  },[selected, dispatch]);

  return (
      <div className="App">
          <Stack>
            {favoriteList?.map((item, index) =>
                    <ButtonGroup segmented>
                      <Button size={"slim"} key={index} onClick={() => setSelected([item])}>
                        {item}
                    </Button>
                      <Button destructive size={"slim"} icon={<CloseIcon size={16}/>} onClick={()=>removeFromFavoriteList(item)}/>
                    </ButtonGroup>
            )}
          </Stack>
        <CityCard data={cityWeather}/>
        <div className={'input_wrapper'}>
          <Autocomplete options={cityList} selected={selected} textField={textField}
                        onSelect={setSelected}/>
        </div>
        {
          showAlways !== NotificationState.never &&
          <React.Fragment>
            {(selected.length > 0 && showAlways === NotificationState.show) &&
            <div className={'set_favourites_list'}>
              <h2>Add to favorites {selected[0]}?</h2>
              <p onClick={addToFavorites}>
                Yes
              </p>
              <p onClick={() => setShowAlways(NotificationState.hide)}>
                No
              </p>
              <p onClick={turnOffNotifications}>
                Do not show this notification again
              </p>
            </div>

            }
          </React.Fragment>
        }
      </div>
  );
}

export default App;
