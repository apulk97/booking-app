import React, { useState } from 'react'
import { HotelType } from './index.types'
import { useDispatch, useSelector } from 'react-redux'
import { UNSAFE_useRouteId, useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store'
import { signup } from '../../slices/authSlice'
import { SubmitHandler, useForm ,RegisterOptions, FormProvider} from 'react-hook-form'
import BasicDetails from './BasicDetails'
import Type from './TypeSection'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'
import { addhotel } from '../../api/hotel'
function Register() {
  const formMethods = useForm<HotelType>({mode:'onBlur'})
  const onSubmit: SubmitHandler<HotelType> = (data) => addhotel(data)





  return (
    <div>

    <div className='items-center flex-1 flex p-9 border-4 justify-center'>
      <FormProvider {...formMethods} >
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className='flex flex-col gap-4'> 
        <BasicDetails/>
        <Type/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImagesSection/>
        <div>
          <input type="submit" />
        </div>
      </form>

      </FormProvider>
    </div>
    </div>
  )
}

export default Register
