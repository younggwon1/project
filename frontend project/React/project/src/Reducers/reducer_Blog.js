import { FETCH_BLOG } from "../Actions/Blog";


export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BLOG:
            // (x)return state.push(action.payload.data); 
            return action.payload;
        default:
            return state;
    }
}