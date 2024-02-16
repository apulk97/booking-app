import { useLayoutEffect, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import * as api from "../../api/index";
import BookingForm from "../../components/BookingForm";
import BookingSummary from "../../components/BookingSummary";
import { SearchFormInterface } from "../../slices/searchSlice";
import { useParams } from "react-router-dom";
import { UserData } from "../../types/index.types";
import { HotelType, PaymentIntentResponse } from "../../../../backend/src/shared/index.types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const initialHotel: HotelType = {
  name: "",
  city: "",
  country: "",
  description: "",
  type: "",
  pricePerNight: 1,
  starRating: 1,
  facilities: [],
  imageUrls: [],
  adultCount: 1,
  childCount: 1,
  userId: "",
  lastUpdated: new Date(),
  bookings: [],
};

function Confirmation() {
  const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
  const stripePromise = loadStripe(STRIPE_PUB_KEY)
  // const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [hotelData, setHotelData] = useState<HotelType>(initialHotel);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [paymentIntentData, setPaymentIntentData] = useState<PaymentIntentResponse>({
    paymentIntentId: "",
    clientSecret: "",
    totalAmount: 0,
  });
  const searchData: SearchFormInterface = useSelector((state: RootState) => state.search.search);
  const { id = "" } = useParams();

  useEffect(() => {
    if (searchData.checkinDate && searchData.checkoutDate) {
      const nights =
        Math.abs(new Date(searchData.checkoutDate).getTime() - new Date(searchData.checkinDate).getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [searchData.checkinDate, searchData.checkoutDate]);

  useLayoutEffect(() => {
    getUserData();
    getHotelData();
    createPaymentInt();
  }, []);

  const getUserData = async () => {
    const { data } = await api.getUserInfo();
    setUserData(data);
  };

  const getHotelData = async () => {
    const { data } = await api.getHotelById(id);
    setHotelData(data);
  };

  const createPaymentInt = async () => {
    const { data } = await api.createPaymentIntent(id, numberOfNights);
    setPaymentIntentData(data);
  };
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingSummary searchData={searchData} numberOfNights={numberOfNights} hotelData={hotelData} />
      {Boolean(paymentIntentData.clientSecret) && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm userData={userData} paymentIntentData={paymentIntentData} searchData={searchData} hotelId={id} />
        </Elements>
      )}
    </div>
  );
}

export default Confirmation;
