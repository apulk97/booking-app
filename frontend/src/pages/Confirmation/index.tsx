import { useLayoutEffect, useState } from 'react'
import * as api from '../../api/index'
import BookingForm from '../../components/BookingForm'
import BookingSummary from '../../components/BookingSummary'

export interface UserData {
  name: string,
  email: string
}

function Confirmation() {
  const [userData, setUserData] = useState<UserData>({name: '', email: ''})
  useLayoutEffect(() => {
    const getData = async() => {
      const {data} = await api.getUserInfo()
      setUserData(data)
    }
    getData()
  }, [])

  return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-4'>
        <BookingSummary />
        <BookingForm userData={userData} />
    </div>
  )
}

export default Confirmation