import { useFormContext } from 'react-hook-form'
import { HotelType } from '../../types/index.types'

const BasicDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>()

  return (
    <div className="flex flex-col gap-3">

      <h2 className="text-3xl font-bold mb-3 text-center">Add Hotel</h2>

      <div className="gap-3 flex flex-col">
        <label htmlFor="name">
          Name
          <input className="w-full border-2 rounded p-1 px-2" {...register('name', { required: 'Name is required', maxLength: 20 })} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </label>
        <div className="flex gap-3 ">
          <label htmlFor="name">
            City
            <input className="w-full border-2 rounded p-1 px-2" {...register('city', { required: 'City name is required', maxLength: 20 })} />
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </label>
          <label htmlFor="name">
            Country
            <input className="w-full border-2 rounded p-1 px-2" {...register('country', { required: 'Country is required', maxLength: 10 })} />
            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
          </label>
        </div>
        <label htmlFor="description">
          Description
          <input className="w-full border-2 rounded p-1 px-2" {...register('description', { required: 'Description is required', maxLength: 20 })} />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </label>
      </div>

      <label htmlFor="description">
        Pirce per Night
        <br />
        <input
          className="border-2 rounded p-1 px-2 w-1/3"
          type="number"
          {...register('pricePerNight', { required: 'Description is required', maxLength: 20 })}
        />
        {errors.pricePerNight && <span className="text-red-500">{errors.pricePerNight.message}</span>}
      </label>

      <div>
        <label htmlFor="description">
          Star Rating
          <select
            {...register('starRating', {
              required: 'This field is required',
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        {errors.starRating && <span className="text-red-500">{errors.starRating.message}</span>}
      </div>
    </div>
  )
}

export default BasicDetails
