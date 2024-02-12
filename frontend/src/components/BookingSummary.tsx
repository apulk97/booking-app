function BookingSummary() {
  return (
    <div className='border border-slate-300 rounded p-4'>
        <h2 className='font-bold text-xl'>Your Booking Details</h2>
        <div className='mt-3 flex flex-col border-b border-slate-200 py-3'>
            <span>Location: </span>
            <span className='font-bold'>Sheraton Grand, Bangalore, India</span>
        </div>
        <div className='flex justify-between'>
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Check-in</span>
            <span className='font-bold'>Mon Feb 12 2024</span>
        </div>
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Check-out</span>
            <span className='font-bold'>Mon Feb 12 2024</span>
        </div>
        </div>
        
        <div className='flex flex-col border-b border-slate-200 py-3'>
            <span>Total length of stay: </span>
            <span className='font-bold'>1 nights</span>
        </div>
        <div className='flex flex-col py-3'>
            <span>Guests: </span>
            <span className='font-bold'>1 adults & 1 children</span>
        </div>
        </div>
  )
}

export default BookingSummary