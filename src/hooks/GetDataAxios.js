import axios from "axios";

export async function getData(url, dispatch) {
    try{
        dispatch({
            type: 'Fetching_data'
        })
        const response = await axios.get(url)
        dispatch({
            type: 'Fetched_data',
            payload: response.data? response.data : {}
        })
    }
    catch{
        dispatch({
            type: 'Fetched_data_error'
        })
    }
}

export async function getForecastData(url, dispatch) {
    try{
        dispatch({
            type: 'Fetching_forecast_data'
        })
        const response = await axios.get(url)
        dispatch({
            type: 'Fetched_forecast_data',
            payload: response.data? response.data : {}
        })
    }
    catch (err){
        dispatch({
            type: 'Fetched_data_error',
        })
    }
}