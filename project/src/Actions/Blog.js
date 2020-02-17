import axios from 'axios';


const ROOT_URL = 'http://localhost:8800/api/blogs';

export const FETCH_BLOG = 'FETCH_BLOG';

//redux action
// tyoe(mandatory)
// payload(optional, data?)
export async function fetchBLOG() {

    const url = `${ROOT_URL}`;
    const request = await axios.get(url)

    return{
        type: FETCH_BLOG,
        payload: request.data.blogs,
    }
}