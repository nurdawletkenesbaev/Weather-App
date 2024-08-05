import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../store/context'
import { SiTrustedshops } from 'react-icons/si'

const CityAndTime = () => {

    const { state } = useContext(MainContext)

    const timeZone = state.weatherData.timezone? state.weatherData.timezone 
                                               : 0



    let time = new Date('January 01, 1970 00:00:00')
    time.setSeconds((new Date()) / 1000 + timeZone)
    time.toLocaleTimeString()

    const [date, setDate] = useState(time);
    let interval;
    useEffect(() => {
        interval = setInterval(() => {
            tick();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [timeZone]);

    const tick = () => {
        time = new Date('January 01, 1970 00:00:00')
        time.setSeconds((new Date()) / 1000 + timeZone)
        time.toLocaleTimeString()
        setDate(time);
    };





    return (
        <>
            {
                state.isLoading ?
                    <div className='flex flex-col items-center border-[1px] animate-pulse py-[20px] border-gray-300 justify-center shadow-xl h-full rounded-xl'>
                        <h1 className='text-[35px] font-bold mb-7'>City (CO)</h1>
                        <h3 className='text-[30px] font-bold'>00:00:00</h3>
                        <p className='text-[20px]'>Wed Jan 1</p>
                    </div>

                    : <div className='flex flex-col items-center border-[1px] py-[20px] border-gray-300 justify-center shadow-xl h-full rounded-xl'>
                        <h1 className='text-[35px] font-bold mb-7'>{`${state.weatherData?.name} (${state.weatherData.sys?.country})`} </h1>
                        <h3 className='text-[30px] font-bold'>{`${date?.toString().slice(16, 24)}`}</h3>
                        <p className='text-[20px]'>{`${date?.toString().slice(0, 10)}`}</p>
                    </div>
            }
        </>
    )
}

export default CityAndTime
