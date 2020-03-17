import { FETCH_BITCOIN } from "../Actions/Bitcoin";

//biz logic
//src/reducers/reducer_weather.js
//action.type(FETCH_WEATHER) , action.payload(weather.json)
export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BITCOIN:
            // (x)return state.push(action.payload.data); 
            return [{type: action.type, data: action.payload.data , name: action.name}, ...state];
        default:
            return state;
    }
}