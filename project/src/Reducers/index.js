import { combineReducers } from 'redux';
import BlogReducer from './reducer_Blog';
import BitcoinReducer from './reducer_Bitcoin'
import WeatherReducer from './reducer_Weather'

const rootReducer = combineReducers({
    blog : BlogReducer,
    bitcoin : BitcoinReducer,
    weather: WeatherReducer
});

export default rootReducer;