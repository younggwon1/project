import axios from 'axios';

// const API_KEY = 'ac43eb24e70c7ae496fd46f170e6a46492fa0dd1ed97e55b';
// const ROOT_URL = ` https://poloniex.com/confirmApi?h=${API_KEY}`;
const ROOT_URL = 'https://poloniex.com/public?command=returnChartData&start=1580973235&end=1581578035&period=14400';

export const FETCH_BITCOIN = 'FETCH_BITCOIN';

//redux action
// tyoe(mandatory)
// payload(optional, data?)
export async function fetchBITCOIN(bit) {

    const url = `${ROOT_URL}&currencyPair=USDT_${bit}`;
    const request = await axios.get(url)

    return{
        type: FETCH_BITCOIN,
        payload: request,
        name: bit
    }
}