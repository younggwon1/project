import axios from 'axios';

const API_KEY = '3595803a7ed0f504fc389b1bd900a9d4';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

// redux action 
//  type (mandatory)
//  payload (optional, data?)

export async function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city}`;
  const request = await axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request,
    name: 'test_coin'
  }
}