import { BsCardImage } from "react-icons/bs"; 
import { HiPaperAirplane } from "react-icons/hi";
import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../store/context'
import { getForecastData } from '../../../hooks/GetDataAxios'
import { BsFillSunFill } from 'react-icons/bs'


import icon_1 from '../../images/cloud-5.png'
import icon_2 from '../../images/cloud-17.png'
import icon_3 from '../../images/cloud-f-6.png'
import icon_4 from '../../images/cloud-f-rain-7.png'
import icon_5 from '../../images/cloud-rain-9.png'
import icon_6 from '../../images/cloud-sun-10.png'
import icon_7 from '../../images/cloud-wind-8.png'
import icon_8 from '../../images/cloud-wind-13.png'
import icon_9 from '../../images/moon-11.png'
import icon_10 from '../../images/moon-star-4.png'
import icon_11 from '../../images/sun-2.png'
import icon_12 from '../../images/sun-rain-16.png'

const HourlyForecast = () => {
    const { state, dispatch } = useContext(MainContext)
    
    function weatherIcon(icon) {
        switch (icon) {
            case '04d':
                return icon_1
            case '04n':
                return icon_1
            case '03d':
                return icon_2
            case '03n':
                return icon_2
            case '11d':
                return icon_3
            case '11n':
                return icon_4
            case '10d':
                return icon_12
            case '10n':
                return icon_5
            case '01d':
                return icon_11
            case '01n':
                return icon_9
            case '9d':
                return icon_12
            case '9n':
                return icon_12
            case '02d':
                return icon_6
            case '02n':
                return icon_10
            case '50d':
                return icon_8
            case '50n':
                return icon_8
            case '13d':
                return icon_7
            case '13n':
                return icon_8

        }
    }

    function timeData(dt, timezone) {
        const date = new Date('January 01, 1970 00:00:00')
        const time = date.setSeconds(dt + timezone)
        return date
    }

    return (
        <div className='flex justify-around flex-col gap-3 border-[1px] border-gray-300 py-[20px] px-[30px] rounded-xl shadow-2xl h-full'>
            <h1 className='text-center text-[28px] font-bold'>Hourly Forecast:</h1>
            <div className='grid grid-cols-3 xl:grid-cols-5 gap-[10px]'>
                {
                    state.isForecastLoading || state.isLoading ? 
                    [1, 2, 3, 4, 5].map((item, index) => {
                        if (index < 5) {
                            return (
                                <div key={index} className="flex flex-col gap-1 bg-gray-200 items-center border-[1px] border-gray-200 px-6 py-3 rounded-md shadow-lg">
                                    <p className="font-bold text-[17px] animate-pulse">00:00</p>
                                    <div className="w-[50px] h-[50px] animate-pulse flex justify-center text-[30px] border-gray-200 rounded-md border-[1px"><BsCardImage /> </div>
                                    <span className="font-bold text-[15px] animate-pulse">0°C</span>
                                    <div className="text-blue-500 animate-pulse">
                                        <HiPaperAirplane size={30} />
                                    </div>
                                    <p className="font-bold text-[15px] animate-pulse">km/h</p>
                                </div>
                            )
                        }
                    })

                    :
                    state.forecastData.list?.map((item, index) => {
                        if (index < 5) {
                            return (
                                <div key={index} className="flex flex-col gap-1 bg-white items-center border-[1px] border-gray-200 px-6 py-3 rounded-md shadow-lg">
                                    <p className="font-bold text-[17px]">{timeData(item.dt, state.forecastData.city.timezone)?.toString().slice(16,21)}</p>
                                    <div className="w-[50px] h-[50px]"> <img className="w-full" src={weatherIcon(item.weather[0].icon)} alt="" /></div>
                                    <span className="font-bold text-[15px]">{Math.round(item.main.temp - 273.15)}°C</span>
                                    <div className="text-blue-500">
                                        <HiPaperAirplane size={30} style={{ transform: `rotate(${item.wind.deg + 90}deg)` }} />
                                    </div>
                                    <p className="font-bold text-[15px]">{item?.wind.speed}km/h</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default HourlyForecast
