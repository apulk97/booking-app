import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { addHotel } from '../../api'
import { RootState } from '../../store'
import BasicDetails from './BasicDetails'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'
import Type from './TypeSection'
import { HotelType } from '../../types/index.types'

function Register() {
  const { authData } = useSelector((state: RootState) => state.auth);  

  const formMethods = useForm<HotelType>({mode:'onBlur'})
  console.log(authData)

  const onSubmit: SubmitHandler<HotelType> = (data:Object) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      // Check if the current value is an array
      if (Array.isArray(value)) {
        // If it's an array, convert it to a comma-separated string
        value = value.join(',');
      }
      // Append the key-value pair to the FormData object
      formData.append(key, value);
    });

    addHotel(authData.token,formData)
  
  
  }





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
