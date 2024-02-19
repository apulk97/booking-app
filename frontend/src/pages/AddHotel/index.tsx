import { useLayoutEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { addHotel, editHotel, getHotel } from '../../api'
import { HotelType } from '../../types/index.types'
import BasicDetails from './BasicDetails'
import FacilitiesSection from './FacilitiesSection'
import GuestsSection from './GuestsSection'
import ImagesSection from './ImagesSection'
import Type from './TypeSection'
import { toast } from 'react-toastify'

function AddEditHotel() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const formMethods = useForm<HotelType>({ mode: 'all' })
  const { reset } = formMethods

  const onSubmit: SubmitHandler<HotelType> = async (data: HotelType) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val))
        return
      }
      if (key == 'imageFiles') {
        Array.from(data[key]).forEach((obj) => formData.append(key, obj))
        return
      }
      formData.append(key, value.toString())
    })

    try {
      const response = hotelId ? await editHotel(hotelId, formData) : await addHotel(formData)

      if (response.status === 201) {
        navigate('/my-hotels')
        const successMessage = hotelId ? 'Hotel modified successfully.' : 'Hotel added successfully.'
        toast(successMessage, { type: 'success' })
      }
    } catch (error) {
      console.error('Error submitting hotel:', error)
    }
  }

  useLayoutEffect(() => {
    console.log('useLayoutEffect')

    if (hotelId) {
      getHotel(hotelId).then((response) => {
        if (response.status == 200) {
          reset({ ...response.data })
        }
      })
    }
  }, [])

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
              <button type="submit" className="text-white text-xl bg-blue-600 p-3 font-bold cursor-pointer px-6">
                {hotelId ? 'Save Changes' : 'Add Hotel'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default AddEditHotel
