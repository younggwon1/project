import { FETCH_WEATHER } from '../Actions/Weather';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WEATHER:
      return [ 
        {
          type: action.type,
          data: action.payload.data,
          name: action.name
        }, 
        ...state
      ];
    default:
      return state;
  }
}