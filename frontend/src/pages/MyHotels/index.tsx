import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HotelType } from '../../../../backend/src/shared/index.types';
import * as api from '../../api/index';
import MyHotelCard from '../../components/MyHotelCard';
import { RootState } from '../../store';


function MyHotels() {
  const { authData } = useSelector((state: RootState) => state.auth);  
  const [hotelData, setHotelData] = useState<HotelType[]>([])

  useEffect(() => {
    const fetchHotelData = async () => {
      const {data} = await api.myHotels(authData.token)
      setHotelData(data)
    }
    fetchHotelData()
  },[])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <button className='text-white text-xl bg-blue-600 p-3 font-bold'>Add Hotel</button>
      </div>
      <div className='flex flex-col pt-5 gap-5'>
          {hotelData.map(item => (<MyHotelCard hotelData={item} />))}
        </div>
    </div>
  )
}

export default MyHotels