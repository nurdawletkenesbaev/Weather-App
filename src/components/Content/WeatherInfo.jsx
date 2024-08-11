import { CiImageOn } from "react-icons/ci";
import { ImCloud } from "react-icons/im";
import { SiKeepassxc } from "react-icons/si";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { BsSunrise } from "react-icons/bs";
import React, { useContext } from 'react'
import { MainContext } from "../../store/context";
import { weatherIcon } from "../../config/contants";

const WeatherInfo = () => {
    const { state } = useContext(MainContext)

    const stats = [
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
    function timeData(time) {
        if (state.weatherData.sys) {
            const date = new Date('January 01, 1970 00:00:00')
            date.setSeconds(time + state.weatherData.timezone)
            return date
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
                                <div className="flex gap-2 items-end md:items-center mt-[20px] justify-center">
                                    <div className="text-orange-500"><BsSunrise size={45} /></div>
                                    <div>
                                        <p className="font-bold">Sunrise</p>
                                        <span>{timeData(+state.weatherData.sys?.sunrise)?.toString()
                                            .slice(16, 21)} AM</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-end md:items-center mt-[20px] justify-center">
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
