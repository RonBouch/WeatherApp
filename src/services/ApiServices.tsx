// import localCities from '../data/cities.json';
// import localCurrentWeather from '../data/currentWeather.json';
// import localDailyForecasts from '../data/dailyWeather.json'

import { Url_Types } from "./Enum";
import { toast } from 'react-toastify';

const API_KEY = `tGpt7bgaYpXZahWrJxKuY0K68ggFTjBO`;


export const getApiData = async (type: string, txt: string = 'tel aviv') => { //TODO 
    try {
        let data: any = null;
        switch (type) {
            case Url_Types.getCities:
                data = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${txt}`);//localCities //
                break;
            case Url_Types.getDailyForecasts:
                data = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${txt}?apikey=${API_KEY}`);//localDailyForecasts //
                break;
            case Url_Types.getCurrentWeather:
                data = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${txt}?apikey=${API_KEY}`);//localCurrentWeather //
                break;
            default:
                data = [];
                break;
        }
        let result = await data.json();//data//
        return result;
    }
    catch (ex: any) {
        console.log('getApiData Error ' + ex)
        toast.error(type + ' - ' + ex);
        return [];
    }
}
