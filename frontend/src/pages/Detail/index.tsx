import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as api from "../../api/index";
import GuestInfoForm from "./guestInfoForm";


export default function HotelDetail() {
  const { hotelId } = useParams<{ hotelId: string }>(); // Ensure correct typing for hotelId
  const { authData } = useSelector((state: RootState) => state.auth);
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const { data } = await api.detailHotel(hotelId);
        setHotel(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
        // Handle error (e.g., show error message)
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  return (
    <div className="space-y-6">
      {loading && <div>Loading...</div>}
      {hotel && (
        <>
          <div>
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(
                (
                  _,
                  index // Add key prop to list items
                ) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                )
              )}
            </span>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {hotel.imageUrls.map(
              (
                image: string,
                index: number // Add key prop to list items
              ) => (
                <div key={index} className="h-[300px]">
                  <img
                    src={image}
                    alt={hotel.name}
                    className="rounded-md w-full h-full object-cover object-center"
                  />
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {hotel.facilities.map(
              (
                facility: string,
                index: number // Add key prop to list items
              ) => (
                <div
                  key={index}
                  className="border border-slate-300 rounded-sm p-3"
                >
                  {facility}
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="h-fit">
              <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
