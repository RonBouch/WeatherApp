import React, { useCallback, useEffect, useState } from 'react'
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, setCities, setCurrentCity, setCurrentWeather, setDailyForecasts, setLoader } from '../../redux/weatherStore';
import { debounce } from "lodash";
import { RenderCurrentWeather, Search } from '../../components';
import { getApiData } from '../../services/ApiServices';
import { Url_Types } from '../../services/Enum';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
const HomePage = () => {
    const dispatch = useDispatch();
    const { favorites, dailyForecasts, currentWeather, cities, currentCity } = useSelector((state: RootState) => state.weatherStore);
    const [searchValue, setSearchValue] = useState('');
    const isItemSelected = (favorites.findIndex((item: { Key: string; }) => item.Key === cities[0]?.Key) !== -1)
    const { city } = useParams();
    const getCurrentWeatherTemp = currentWeather && currentWeather[0]?.Temperature?.Metric

    useEffect(() => {
        if (city) {
            dispatch(setCurrentCity(city))
            getDataFromApi(city);
        }
    }, [city])

    useEffect(() => {
        if (!currentWeather)
            getDataFromApi();
    }, [])

    const getDataFromApi = async (e?: string) => {
        let key = (await getCities(e))[0]?.Key;
        await onChangeCurrentWeather(key || '');
    }
    const getCities = async (e?: string) => {
        const res = await getApiData(Url_Types.getCities, e);
        dispatch(setCities(res))
        dispatch(setCurrentCity(res[0]?.LocalizedName));
        return res;
    }

    const handleNewDataWithDebounce: any = useCallback(debounce(getCities, 1000), []);


    const onChangeCurrentWeather = async (key: string) => {
        const getCurrentWeather = await getApiData(Url_Types.getCurrentWeather, key);
        dispatch(setCurrentWeather(getCurrentWeather));
        const getDailyForecasts = await getApiData(Url_Types.getDailyForecasts, key);
        dispatch(setDailyForecasts(getDailyForecasts?.DailyForecasts));
    }

    const handleChangeText = useCallback((e: string, withoutApi?: boolean) => {
        setSearchValue(e)
        if (!withoutApi) {
            if (e.length > 2) {
                dispatch(setLoader(true))
                handleNewDataWithDebounce(e);
            } else if (e.length == 2) {
                dispatch(setLoader(true))
                handleNewDataWithDebounce();
            }
        }
    }, [searchValue]);

    const onSearchClear = useCallback(() => {
        setSearchValue('')
        dispatch(setCities([]));
    }, [searchValue]);

    const addToFavorite = () => {
        dispatch(addFavorite(currentWeather))
        if (isItemSelected)
            toast.warning('Item deleted successfully');
        else
            toast.success('Item added successfully');
    }
    return (
        <div className='HomePage-container'>
            <Search
                searchValue={searchValue}
                onChange={handleChangeText}
                onPressCity={onChangeCurrentWeather}
                onSearchClear={onSearchClear}
            />
            <div className='header-con'>

                <div className='favorite'>
                    <button className='btn btn-add' onClick={() => addToFavorite()}>
                        <FaRegHeart size={24} fill={isItemSelected ? 'red' : 'white'} />
                    </button>
                </div>

                <div className='current-city'>
                    <p>{currentCity} - </p>
                    {getCurrentWeatherTemp && <p>{getCurrentWeatherTemp?.Value} {getCurrentWeatherTemp?.Unit}</p>}
                </div>
            </div>
            {currentWeather && currentWeather.length > 0 &&
                <RenderCurrentWeather
                    data={currentWeather}
                    LocalizedName={currentCity}
                />

            }

        </div>
    )
}
export default HomePage;
