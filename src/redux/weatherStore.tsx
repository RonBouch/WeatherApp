import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface WeatherState {
  favorites: any[],
  loader: boolean,
  dailyForecasts: any,
  currentCity: string | null,
  cities: any[],
  currentWeather: any,
}

const initialState: WeatherState = {
  favorites: [],
  loader: false,
  dailyForecasts: [],
  currentCity: null,
  cities: [],
  currentWeather: null,
}

export const weatherSlice = createSlice({
  name: 'weatherStore',
  initialState,
  reducers: {
    setCities: (state: any, action: PayloadAction<any[]>) => {
      state.cities = action.payload;
    },
    addFavorite: (state: any, action: PayloadAction<any>) => {
      let index = state.favorites.findIndex((item: { Key: string; }) => item.Key === state.cities[0]?.Key)
      if (index === -1) {
        state.favorites.push({ ...action.payload[0], LocalizedName: state.cities[0]?.LocalizedName, Key: state.cities[0]?.Key || '' })
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setLoader: (state: any, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setDailyForecasts: (state: any, action: PayloadAction<any>) => {
      state.dailyForecasts = action.payload;
    },
    setCurrentCity: (state: any, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setCurrentWeather: (state: any, action: PayloadAction<any[]>) => {
      state.currentWeather = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { addFavorite, setLoader, setDailyForecasts, setCurrentCity, setCities, setCurrentWeather } = weatherSlice.actions

export default weatherSlice.reducer