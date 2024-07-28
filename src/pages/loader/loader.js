import React from 'react'
import './loader.css'
import LoadingGif from '../../assets/gif/loaging.gif'

const Loader = () => {
  return (
    <div className='loadingGif'>
        <img className='gifImg' src={LoadingGif} alt="" />
    </div>
  )
}

export default Loader
