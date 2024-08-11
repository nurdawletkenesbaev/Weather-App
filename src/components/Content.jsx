import { CiImageOn } from "react-icons/ci";
import React, { useContext } from 'react'
import CityAndTime from './Content/CityAndTime'
import WeatherInfo from './Content/WeatherInfo'
import HourlyForecast from './Content/HourlyForecast'
import { MainContext } from '../store/context'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css'
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { HiPaperAirplane } from 'react-icons/hi'
import { weatherIcon } from "../config/contants";

const Content = () => {
  const { state } = useContext(MainContext)

  function forecastDay(dt) {
    let time = new Date('January 01, 1970 00:00:00')
    time.setSeconds(dt)
    time.toLocaleTimeString()

    return time
  }

  const nowDate = +(state.forecastData.list?.[0].dt_txt.slice(8, 10))

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

  return (
    <>
      {
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
