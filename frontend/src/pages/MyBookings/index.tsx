import React, { useState, useEffect } from "react";
import BookingCard from "../../components/BookingCard";
import { HotelType } from "../../../../backend/src/shared/index.types";
import * as api from "../../api/index";

function MyBookings() {
  const [bookings, setBookings] = useState<HotelType[]>([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const { data } = await api.getBookings();
    setBookings(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">My Bookings</h2>
      <div className="flex flex-col gap-3 pt-3">
        {Boolean(bookings.length) && bookings.map((hotel) => <BookingCard hotelData={hotel} />)}
      </div>
    </div>
  );
}

export default MyBookings;
