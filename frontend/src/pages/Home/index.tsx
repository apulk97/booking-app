import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import * as api from '../../api/index'
import { RootState } from "../../store"
import LatestHotelCard from "../../components/LatestHotelCard"
import { HotelType } from "../../../../backend/src/shared/index.types"

function Home() {
  const profile = localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile') || '')
  const name: string = profile?.name || ''
  const {authData} = useSelector((state: RootState) => state.auth)
  const [hotels, setHotels] = useState<HotelType[]>([])
  
  useEffect(() => {
    getLatestHotelData()
  }, [])

  const getLatestHotelData = async () => {
    const {data} = await api.getLatestHotels()
    setHotels(data)
  } 

  return (
    <>
    {Boolean(name) ? <h2 className="text-2xl font-bold">Welcome, {name}</h2> : <p className="text-xl">Please sign in to add your own hotels.</p>}
    <span className="pt-4">Check out the most recent destinations added by our hosts.</span>
    <div className="grid md:grid-cols-2 gap-6 pt-4">
      {hotels.map((item) => (<LatestHotelCard hotel = {item}/>))}
    </div>
    </>
  )
}

export default Home