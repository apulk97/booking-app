import { FormEvent } from "react";
import { PaymentIntentResponse } from "../../../backend/src/shared/index.types";
import { UserData } from "../types/index.types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { SearchFormInterface } from "../slices/searchSlice";
import * as api from '../api/index'
import { ToastContainer, toast } from "react-toastify";
interface Props {
  userData: UserData;
  paymentIntentData: PaymentIntentResponse;
  searchData: SearchFormInterface,
  hotelId: string
}

function BookingForm({ userData, paymentIntentData, searchData, hotelId }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!elements || !stripe) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      const formData = {
        name: userData.name,
        email: userData.email,
        adultCount: searchData.adultCount,
        childCount: searchData.childCount,
        checkIn: new Date(searchData.checkinDate),
        checkOut: new Date(searchData.checkoutDate),
        totalCost: paymentIntentData.totalAmount,
      }
      const { status } = await api.bookRoom({ data: formData, paymentIntentId: result.paymentIntent.id }, hotelId);
      if (status == 200) {
        toast.success('Booking confirmed')
      }
      
    }
  };
  return (
    <div className="border border-slate-300 rounded p-4">
      <ToastContainer />
      <h2 className="font-bold text-3xl">Confirm Your Details</h2>
      <form className="mt-5 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold flex-1">Name</label>
            <input
              type="text"
              value={userData.name}
              disabled
              className="mt-1 border rounded w-full py-1 px-3 text-gray-700 bg-gray-200 font-normal"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold flex-1">Email</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="mt-1 border rounded w-full py-1 px-3 text-gray-700 bg-gray-200 font-normal"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Your Price Summary</h2>

          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">Total Cost: Rs {paymentIntentData.totalAmount}</div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Payment Details</h2>

          <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
        </div>
        <div className="mt-3 flex justify-end">
          <button type="submit" className=" bg-blue-600 text-white text-l font-bold p-2">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
