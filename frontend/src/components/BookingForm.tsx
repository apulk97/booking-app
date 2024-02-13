
function BookingForm() {
  return (
    <div className="border border-slate-300 rounded p-4">
      <h2 className="font-bold text-3xl">Confirm Your Details</h2>
      <form className="mt-5 flex flex-col">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold flex-1">Name</label>
            <input
              type="text"
              disabled
              className="mt-1 border rounded w-full py-1 px-3 text-gray-700 bg-gray-200 font-normal"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold flex-1">Email</label>
            <input
              type="email"
              disabled
              className="mt-1 border rounded w-full py-1 px-3 text-gray-700 bg-gray-200 font-normal"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>

          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">Total Cost: Rs 4000</div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Payment Details</h2>

          <div className="border w-full p-2 rounded flex justify-between">
            
          </div>
        </div>
        <div className="mt-3 flex justify-end">
        <button className=" bg-blue-600 text-white text-l font-bold p-2">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
