import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import {
  SearchFormInterface,
  initialSearch,
  updateSearchForm,
} from "../../slices/searchSlice";
import { AppDispatch } from "../../store";

type Props = {
  pricePerNight: number;
  hotelId: string;
};

const GuestInfoForm = ({ pricePerNight, hotelId }: Props) => {
  const isLoggedIn = localStorage.getItem("profile");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchForm, setSearchForm] =
    useState<SearchFormInterface>(initialSearch);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const updateForm = (key: string, val: number | string | Date): void => {
    setSearchForm((prev) => ({ ...prev, [key]: val }));
  };

  const onSubmit = () => {
    dispatch(updateSearchForm(searchForm));
    navigate(`/hotel/${hotelId}/booking`);
  };

  const onSignInClick = () => {
    dispatch(updateSearchForm(searchForm));
    navigate("/signin");
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">£{pricePerNight}</h3>
      <form onSubmit={isLoggedIn ? onSubmit : onSignInClick}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selectsStart
              selected={new Date(searchForm.checkinDate)}
              onChange={(date) =>
                updateForm("checkinDate", date?.toISOString() ?? "")
              }
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={new Date(searchForm.checkoutDate)}
              onChange={(date) =>
                updateForm("checkoutDate", date?.toISOString() ?? "")
              }
              selectsStart
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex flex-1 justify-between bg-white p-2">
            <div className="flex w-1/2 items-center">
              <label className="text-lg">Adult: </label>
              <input
                value={searchForm.adultCount}
                onChange={(e) => {
                  if (+e.target.value > 0 || e.target.value === "") {
                    updateForm("adultCount", e.target.value);
                  }
                }}
                className="w-2/3 text-lg pl-1 font-bold focus: outline-none"
                type="number"
              />
            </div>
            <div className="flex w-1/2 items-center">
              <label className="text-lg">Child: </label>
              <input
                value={searchForm.childCount}
                onChange={(e) => {
                  if (+e.target.value > 0 || e.target.value === "") {
                    updateForm("childCount", e.target.value);
                  }
                }}
                className="w-2/3 text-lg pl-1 font-bold focus: outline-none"
                type="number"
              />
            </div>
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
