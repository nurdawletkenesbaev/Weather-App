import { CiImageOn } from "react-icons/ci";
import { ImCloud } from "react-icons/im";
import { SiKeepassxc } from "react-icons/si";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { BsSunrise } from "react-icons/bs";
import React, { useContext } from 'react'
import { MainContext } from "../../store/context";

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

const WeatherInfo = () => {
    const { state, dispatch } = useContext(MainContext)

    let stats = []
    if (!state.isLoading) {
        stats = [
            {
                id: 1,
                Icon: BsDropletHalf,
                value: `${state.weatherData.main?.humidity}%`,
                title: 'Humidity'
            },
            {
                id: 2,
                Icon: BsWind,
                value: `${state.weatherData.wind?.speed}km/h`,
                title: 'Wind Speed'
            },
            {
                id: 3,
                Icon: SiKeepassxc,
                value: `${state.weatherData.main?.pressure}hPa`,
                title: 'Pressure'
            },
            {
                id: 4,
                Icon: ImCloud,
                value: `${state.weatherData.clouds?.all}%`,
                title: 'Cloudiness'
            }
        ]
    }
    function timeData(time) {
        if (state.weatherData.sys) {
            const date = new Date('January 01, 1970 00:00:00')
            const sun = date.setSeconds(time + state.weatherData.timezone)
            return date
        }
    }
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

    return (
        <>
            {
                state.isLoading ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border-[1px] border-gray-300 py-[10px] px-[30px] rounded-xl shadow-xl  ">
                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-[40px]">0°C</h1>
                            <span>Feels like: 0°C</span>
                            <div className="flex gap-2 items-center mt-[20px] justify-center">
                                <div className="text-orange-500"><BsSunrise size={45} /></div>
                                <div>
                                    <p className="font-bold">Sunrise</p>
                                    <span>00:00 AM</span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center mt-[20px] justify-center">
                                <div className="text-orange-500"><BsSunset size={45} /></div>
                                <div>
                                    <p className="font-bold">Sunset</p>
                                    <span>00:00 PM</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="h-[150px] text-[100px] flex justify-center w-full">
                                <CiImageOn />
                            </div>
                            <span className="text-2xl font-semibold">weather</span>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {
                                [1, 2, 3, 4].map((index) => (
                                    <div key={index} className="flex flex-col gap-1 text-center items-center">
                                        <div className="text-blue-700 text-[35px]"><CiImageOn /></div>
                                        <span className="text-[17px] font-semibold">00</span>
                                        <span className="text-[15px]">stats</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border-[1px] border-gray-300 py-[10px] px-[30px] rounded-xl shadow-xl ">
                        <div className="flex flex-col items-center ">
                            <h1 className="font-bold text-[40px]">{Math.round(state.weatherData.main?.temp - 273.15)}°C</h1>
                            <span>Feels like: {(state.weatherData.main?.feels_like - 273.15).toFixed()}°C</span>
                            <div className="flex justify-between gap-[20px]">
                                <div className="flex gap-2 items-end mt-[20px] justify-center">
                                    <div className="text-orange-500"><BsSunrise size={45} /></div>
                                    <div>
                                        <p className="font-bold">Sunrise</p>
                                        <span>{timeData(+state.weatherData.sys?.sunrise)?.toString()
                                            .slice(16, 21)} AM</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-end mt-[20px] justify-center">
                                    <div className="text-orange-500"><BsSunset size={45} /></div>
                                    <div>
                                        <p className="font-bold">Sunset</p>
                                        <span>{timeData(+state.weatherData.sys?.sunset)?.toString()
                                            .slice(16, 21)} PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center ">
                            <div className="w-[150px] h-[150px]">
                                <img className="f-wull" src={weatherIcon(state.weatherData.weather?.[0].icon)} alt="" />
                            </div>
                            <span className="text-2xl font-semibold">{state.weatherData.weather?.[0].description}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-5  ">
                            {
                                stats?.map(({ Icon, id, value, title }) => (
                                    <div key={id} className="flex flex-col gap-1 text-center items-center">
                                        <div className="text-blue-700"><Icon size={35} /></div>
                                        <span className="text-[17px] font-semibold">{value}</span>
                                        <span className="text-[15px]">{title}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default WeatherInfo
