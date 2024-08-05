export const initialState = {
    weatherData: {},
    forecastData: {},
    isLoading: true,
    isForecastLoading: true,
    searchCity: 'Nukus'
}

export function reducer(state, action) {
    switch (action.type) {
        case 'Fetching_data':
            return {
                ...state,
                isLoading: true
            }
        case 'Fetched_data':
            return {
                ...state,
                weatherData: action.payload,
                isLoading: false
            }
        case 'Fetched_data_error':
            return {
                ...state,
                isLoading: false
            }

        case 'Fetching_forecast_data':
            return {
                ...state,
                isForecastLoading: true
            }
        case 'Fetched_forecast_data':
            return {
                ...state,
                forecastData: action.payload,
                isForecastLoading: false
            }
        case 'Fetched_forecast_data_error':
            return {
                ...state,
                isForecastLoading: false
            }
        case 'Search_city' :
            return {
                ...state,
                searchCity: action.payload
            }
    }
}