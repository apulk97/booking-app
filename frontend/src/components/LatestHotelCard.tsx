import React from 'react'
import { HotelType } from '../../../backend/src/shared/index.types'
import { Link } from 'react-router-dom'

interface Props {
    hotel: HotelType
}

function LatestHotelCard({hotel}: Props ) {
  return (
    <Link to={`/detail/${hotel._id}`}>
        <div className='h-[250px] rounded overflow-hidden w-full relative'>
            <img src={hotel?.imageUrls?.[0] ?? ''} className='w-full h-full object-cover'/>
            <div className='absolute bottom-0 p-2 bg-black bg-opacity-50 w-full'>
                <span className='font-bold text-xl text-white'>{hotel.name}</span>
            </div>
        </div>
    </Link>
  )
}

export default LatestHotelCard