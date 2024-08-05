import React, { useReducer } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import { MainContext } from './store/context'
import { initialState, reducer } from './store/reducer'

import backImg from '../src/images/bg.jpeg'

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <MainContext.Provider value={{state, dispatch}}>
      <div className='from-gray-400 relative'>
        <img src={backImg} alt="" className='absolute top-0 bottom-0 right-0 left-0 w-full h-full blur-sm -z-10'/>
        <Header />
        <Content />
      </div>
    </MainContext.Provider>
  )
}

export default App
