import React, { useContext, useEffect, useRef } from 'react'
import { getData, getForecastData } from '../hooks/GetDataAxios'
import { MainContext } from '../store/context'

const Header = () => {
  const { state, dispatch } = useContext(MainContext)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${state.searchCity}&appid=e23e7d807daeed62b6f6b99229a2dc37`


  useEffect(() => {
    getData(url, dispatch)
  }, [state.searchCity])

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${state.weatherData.coord?.lat}&lon=${state.weatherData.coord?.lon}&appid=cec19a0d3054f0ece0ac87805d6ece0e`
  useEffect(() => {
    if (state.weatherData.weather) getForecastData(forecastUrl, dispatch)
  }, [state.weatherData.coord])



  const inputForm = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    const value = e.target['input'].value.trim()
    if (value.length > 0) {
      dispatch({
        type: 'Search_city',
        payload: value
      })
    }
    else {
      e.target['input'].focus()
    }
    inputForm.current.reset()
  }

  return (
    <div className=' h-[60px]  top-0 z-10'>
      <form onSubmit={(e) => handleSubmit(e)} ref={inputForm} className='relative mx-auto w-[90%] drop-shadow-md h-full flex justify-center items-center '>
        <div className='relative w-full sm:w-[50%]'>
          <input id='input' type="text" placeholder='Search by city name...' className='w-full border-blue-500 border-[1px] py-[5px] px-[20px] rounded-[3px] outline-none' />
          <button type='submit' className='absolute top-[2px] right-[2px] bg-blue-400 py-[4px] px-[19px] rounded-sm active:scale-95 duration-75'>Search</button>
        </div>
      </form>
    </div>
  )
}

export default Header
