import { useLayoutEffect, useState, useEffect } from "react";
import * as api from "../../api/index";
import BookingForm from "../../components/BookingForm";
import BookingSummary from "../../components/BookingSummary";
import { SearchFormInterface } from "../../slices/searchSlice";
import { useParams } from "react-router-dom";
import { UserData } from "../../types/index.types";
import { HotelType } from "../../../../backend/src/shared/index.types";
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
};

function Confirmation() {
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [hotelData, setHotelData] = useState<HotelType>(initialHotel);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const searchData: SearchFormInterface = useSelector((state: RootState) => state.search.search)
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
  }, []);

  const getUserData = async () => {
    const { data } = await api.getUserInfo();
    setUserData(data);
  };

  const getHotelData = async () => {
    const { data } = await api.getHotelById(id);
    setHotelData(data);
  };
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingSummary searchData={searchData} numberOfNights={numberOfNights} hotelData={hotelData} />
      <BookingForm userData={userData} />
    </div>
  );
}

export default Confirmation;
