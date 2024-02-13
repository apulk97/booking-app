import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { addHotel, getHotel } from '../../api'
import { RootState } from '../../store'
import BasicDetails from './BasicDetails'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'
import Type from './TypeSection'
import { HotelType } from '../../types/index.types'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useLayoutEffect } from 'react'

function AddEditHotel() {
  const { authData } = useSelector((state: RootState) => state.auth)
  const {hotelId} = useParams()
  const navigate = useNavigate()
  const formMethods = useForm<HotelType>({ mode: 'all' })

  const onSubmit: SubmitHandler<HotelType> = (data: HotelType) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val)=>formData.append(key,val))
        return
      }
      if(key=='imageFiles'){
        Array.from(data[key]).forEach((obj)=>formData.append(key,obj))
        return
      }
      formData.append(key, value.toString())
    })
    addHotel(authData.token, formData).then((response) => navigate('/my-hotels'))
  }

  useLayoutEffect(()=>{
    if(hotelId){
      getHotel(authData.token, hotelId).then((response)=>{
        if(response.status == 201){

        }
      })
    }
  },[])
  return (
    <div>
      <div className="items-center flex-1 flex p-9 border-4 justify-center">
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <BasicDetails />
            <Type />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <div className="flex justify-end">
              <button type="submit" className="text-white text-xl bg-blue-600 p-3 font-bold rounded-2xl px-6">
                Add Hotel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default AddEditHotel
