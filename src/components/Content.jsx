import { CiImageOn } from "react-icons/ci";
import React, { useContext } from 'react'
import CityAndTime from './Content/CityAndTime'
import WeatherInfo from './Content/WeatherInfo'
import HourlyForecast from './Content/HourlyForecast'
import { MainContext } from '../store/context'


import icon_1 from '../images/cloud-5.png'
import icon_2 from '../images/cloud-17.png'
import icon_3 from '../images/cloud-f-6.png'
import icon_4 from '../images/cloud-f-rain-7.png'
import icon_5 from '../images/cloud-rain-9.png'
import icon_6 from '../images/cloud-sun-10.png'
import icon_7 from '../images/cloud-wind-8.png'
import icon_8 from '../images/cloud-wind-13.png'
import icon_9 from '../images/moon-11.png'
import icon_10 from '../images/moon-star-4.png'
import icon_11 from '../images/sun-2.png'
import icon_12 from '../images/sun-rain-16.png'

import { Swiper, SwiperSlide } from 'swiper/react';

import '../App.css'

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import { HiPaperAirplane } from 'react-icons/hi'

const Content = () => {
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

  function forecastDay(dt) {
    let time = new Date('January 01, 1970 00:00:00')
    time.setSeconds(dt)
    time.toLocaleTimeString()

    return time
  }

  const nowDate = +(state.forecastData.list?.[0].dt_txt.slice(8, 10))

  // console.log(nowDatee)
  // console.log(nowDate)
  const dailyForecastList = state.forecastData.list?.filter(item => {
    const forecastDate = +item.dt_txt.slice(8, 10)
    const forecastHour = +item.dt_txt.slice(11, 13)
    if (forecastDate === nowDate + 1 && forecastHour === 12 ||
      forecastDate === nowDate + 2 && forecastHour === 12 ||
      forecastDate === nowDate + 3 && forecastHour === 12 ||
      forecastDate === nowDate + 4 && forecastHour === 12 ||
      forecastDate === nowDate + 5 && forecastHour == 12) {
      return item
    }
  })
  // console.log(dailyForecastList)


  return (
    <>
      {
        // (state.forecastData.list && state.weatherData.weather) ?
        //   <>
        //   <div className="w-full h-[calc(100vh-60px)] bg-white"></div>
        //   </>
        //   :
          <div>
            <div className='mx-auto w-[90%] min-h-[calc(100vh-60px)] flex flex-col justify-evenly py-[15px]' >
              <div className='flex flex-col lg:flex-row justify-between gap-[20px]'>
                <div className='flex-1'>
                  <CityAndTime />
                </div>
                <div className='flex-[2]'>
                  <WeatherInfo />
                </div>
              </div>

              <div className='flex flex-col-reverse lg:flex-row justify-between gap-[20px] py-[20px]'>
                <div className='flex-1 flex flex-col justify-center items-center gap-[20px] p-[20px] border-[1px] border-gray-300 rounded-xl shadow-xl'>
                  <h1 className='text-center text-[28px] font-bold'>5 Days Forecast:</h1>
                  <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                    loop={false}
                  >
                    {
                      state.isForecastLoading || state.isLoading ?
                        [1, 2, 3, 4, 5].map((item, index) => (
                          <SwiperSlide key={index} className='bg-white border-[1px] border-gray-300 '>
                            <div className='text-gray-800 flex flex-col items-center p-[10px]'>
                              <p>Wed Jan 01</p>
                              <div className='w-[100px] h-[100px] text-[90px] flex justify-center'>
                                <CiImageOn />
                              </div>
                              <span>weather</span>
                              <p>0°C</p>
                              <div className="text-blue-500">
                                <HiPaperAirplane size={30} />
                              </div>
                              <p className="font-bold text-[15px]">km/h</p>
                            </div>
                          </SwiperSlide>
                        ))
                        :
                        dailyForecastList?.map((item, index) => (
                          <SwiperSlide key={index} className='bg-white border-[1px] border-gray-300 '>
                            <div className='text-gray-800 flex flex-col items-center p-[10px]'>
                              <p>{forecastDay(item.dt).toString().slice(0, 10)}</p>
                              <div className='w-[100px] h-[100px]'>
                                <img className='w-full' src={weatherIcon(item.weather[0].icon)} alt="" />
                              </div>
                              <span>{item.weather[0].main}</span>
                              <p>{Math.round(item?.main.temp - 273.15)}°C</p>
                              <div className="text-blue-500">
                                <HiPaperAirplane size={30} style={{ transform: `rotate(${item.wind.deg + 90}deg)` }} />
                              </div>
                              <p className="font-bold text-[15px]">{item.wind.speed}km/h</p>
                            </div>
                          </SwiperSlide>
                        ))
                    }

                  </Swiper>

                </div>
                <div className='flex-[2]'>
                  <HourlyForecast />
                </div>
              </div>
              <div>

              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Content
