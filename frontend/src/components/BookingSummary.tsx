import { HotelType } from "../../../backend/src/shared/index.types"
import { SearchFormInterface } from "../slices/searchSlice"

interface Props {
    searchData: SearchFormInterface,
    numberOfNights: number,
    hotelData: HotelType
}

function BookingSummary({searchData, numberOfNights, hotelData}: Props) {
    const { name, city, country } = hotelData
  return (
    <div className='border border-slate-300 rounded p-4'>
        <h2 className='font-bold text-xl'>Your Booking Details</h2>
        <div className='mt-3 flex flex-col border-b border-slate-200 py-3'>
            <span>Location: </span>
            <span className='font-bold'>{name}, {city}, {country}</span>
        </div>
        <div className='flex justify-between'>
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Check-in</span>
            <span className='font-bold'>{new Date(searchData.checkinDate).toDateString()}</span>
        </div>
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Check-out</span>
            <span className='font-bold'>{new Date(searchData.checkoutDate).toDateString()}</span>
        </div>
        </div>
        
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Total length of stay: </span>
            <span className='font-bold'>{numberOfNights} nights</span>
        </div>
        <div className='flex flex-col py-3'>
            <span>Guests: </span>
            <span className='font-bold'>{searchData.adultCount} adults & {searchData.childCount} children</span>
        </div>
        </div>
  )
}

export default BookingSummary