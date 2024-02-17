import React from "react";
import { HotelType } from "../../../backend/src/shared/index.types";

interface Props {
  hotelData: HotelType;
}

function BookingCard({ hotelData }: Props) {
  return (
    <div className="p-4 border rounded grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4">
      <div className="h-[250px]">
        <img src={hotelData.imageUrls?.length ? hotelData.imageUrls[0] : "https://picsum.photos/200/300"} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-2xl font-bold">{hotelData.name}</h3>
          <p className="text-sm">
            {hotelData.city}, {hotelData.country}
          </p>
        </div>
        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
          {hotelData.bookings.map((booking) => (
            <div>
              <div className="flex gap-2">
                <p className="font-bold">Dates :</p>
                <p>
                  {new Date(booking?.checkIn).toDateString() ?? ""} - {new Date(booking?.checkOut).toDateString() ?? ""}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold">Guests :</p>
                <p>
                  {booking.adultCount} Adults, {booking.childCount} Children
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
