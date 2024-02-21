import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  SearchFormInterface,
  initialSearch,
  updateSearchForm,
} from "../slices/searchSlice";
import { AppDispatch } from "../store";

function Search() {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const [searchForm, setSearchForm] =
    useState<SearchFormInterface>(initialSearch);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const updateForm = (key: string, val: number | string | Date): void => {
    setSearchForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (new Date(searchForm.checkinDate) > new Date(searchForm.checkoutDate)) {
      toast.error("Check in date cannot be greater than checkout date");
      return;
    }
    dispatch(updateSearchForm(searchForm));
    setTimeout(() => navigate("/search"), 1000);
  };

  return (
    <form
      className="p-3 -mt-8 bg-orange-400 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 rounded shadow-md gap-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex flex-1 bg-white p-2">
        <input
          value={searchForm.destination}
          onChange={(e) => updateForm("destination", e.target.value)}
          className="w-full focus:outline-none text-md"
          placeholder="Where are you going ?"
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
      <div className="flex">
        <DatePicker
          selected={new Date(searchForm.checkinDate)}
          onChange={(date) =>
            updateForm("checkinDate", date?.toISOString() ?? "")
          }
          minDate={minDate}
          maxDate={maxDate}
          className="w-full sm:min-w-full bg-white p-3 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex">
        <DatePicker
          selected={new Date(searchForm.checkoutDate)}
          onChange={(date) =>
            updateForm("checkoutDate", date?.toISOString() ?? "")
          }
          minDate={minDate}
          maxDate={maxDate}
          className="w-full sm:min-w-full bg-white p-3 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex flex-1 gap-1 sm:gap-3">
        <button type='submit' className="w-1/2 sm:w-2/3 bg-blue-600 text-white sm:text-xl font-bold p-2 cursor-pointer">
          Search
        </button>
        <button type="button" className="w-1/2 sm:w-1/3 bg-red-600 text-white sm:text-xl font-bold p-2 cursor-pointer" onClick={() => setSearchForm(initialSearch)}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default Search;
