import { useLayoutEffect, useState, useEffect } from "react";
import * as api from "../../api/index";
import BookingForm from "../../components/BookingForm";
import BookingSummary from "../../components/BookingSummary";
import { SearchFormInterface } from "../../slices/searchSlice";

export interface UserData {
  name: string;
  email: string;
}

function Confirmation() {
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [numberOfNights, setNumberOfNights] = useState(1);
  const searchData: SearchFormInterface = JSON.parse(sessionStorage.getItem("search") ?? "");

  useEffect(() => {
    if (searchData.checkinDate && searchData.checkoutDate) {
      const nights =
        Math.abs(new Date(searchData.checkoutDate).getTime() - new Date(searchData.checkinDate).getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [searchData.checkinDate, searchData.checkoutDate]);

  useLayoutEffect(() => {
    const getData = async () => {
      const { data } = await api.getUserInfo();
      setUserData(data);
    };
    getData();
  }, []);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingSummary searchData={searchData} numberOfNights={numberOfNights} />
      <BookingForm userData={userData} />
    </div>
  );
}

export default Confirmation;
