import React from 'react'
import { assets } from '../assets/assets'

function StarRating({rating = 4}) {
  return (
    <div className="flex items-center gap-1 mt-3">
      {Array(5).fill('').map((_, index) => (
        <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className='w-4.5 h-4.5' key={index}/>
      ))}
    </div>
  )
}

export default StarRating