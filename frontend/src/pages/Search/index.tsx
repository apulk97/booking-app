import React from "react";
import StarRatingFilter from "./starRatingFilter";
import HotelTypesFilter from "./hotelTypesFilter";
import FacilitiesFilter from "./facilitiesFilter";
import PriceFilter from "./priceFilter";

function Search() {
  const dummyData = [
    {
      imgUrl: "https://dummyimage.com/250/ffffff/000000",
    },
    {
      imgUrl: "https://dummyimage.com/250/000000/ffffff",
    },
    {
      imgUrl: "https://dummyimage.com/250/ffffff/000000",
    },
    {
      imgUrl: "https://dummyimage.com/250/000000/ffffff",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 ">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter />
          <HotelTypesFilter />
          <FacilitiesFilter />
          <PriceFilter />
        </div>
      </div>
      <div>
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-300 flex-wrap-reverse h-20 "
          >
            <div>{item.imgUrl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
