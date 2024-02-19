import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotelType } from '../../../../backend/src/shared/index.types';
import * as api from '../../api/index';
import MyHotelCard from '../../components/MyHotelCard';
import { ToastContainer } from 'react-toastify';


function MyHotels() {
  const [hotelData, setHotelData] = useState<HotelType[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      const {data} = await api.myHotels()
      setHotelData(data)
    }
    fetchHotelData()
  },[])

  return (
    <div>
      <ToastContainer />
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels</h1>
        <button className='text-white text-xl bg-blue-600 p-3 font-bold' onClick={()=>navigate('/add-hotel')}>Add Hotel</button>
      </div>
      <div className='flex flex-col pt-5 gap-5'>
          {hotelData.map(item => (<MyHotelCard hotelData={item} />))}
        </div>
    </div>
  )
}

export default MyHotels