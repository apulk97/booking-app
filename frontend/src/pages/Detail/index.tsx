import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import * as api from "../../api/index";
import GuestInfoForm from "./guestInfoForm";
import { HotelType } from "../../types/index.types";

export default function HotelDetail() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<HotelType>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const { data } = await api.getHotelById(hotelId ?? '');
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
              hotelId={hotelId ?? ''}
            pricePerNight={hotel.pricePerNight}
          />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
