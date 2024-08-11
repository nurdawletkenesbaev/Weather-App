import { BsCardImage } from "react-icons/bs"; 
import { HiPaperAirplane } from "react-icons/hi";
import React, { useContext } from 'react'
import { MainContext } from '../../store/context'
import { weatherIcon } from "../../config/contants";



const HourlyForecast = () => {
    const { state } = useContext(MainContext)
    function timeData(dt, timezone) {
        const date = new Date('January 01, 1970 00:00:00')
        date.setSeconds(dt + timezone)
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
