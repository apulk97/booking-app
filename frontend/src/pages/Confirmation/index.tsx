import React from 'react'
import BookingSummary from '../../components/BookingSummary'
import BookingForm from '../../components/BookingForm'

function Confirmation() {
  return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-4'>
        <BookingSummary />
        <BookingForm />
    </div>
  )
}

export default Confirmation