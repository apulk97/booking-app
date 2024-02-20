import { useEffect, useState } from "react";

import * as api from "../../api/index";
import FacilitiesFilter from "./facilitiesFilter";
import HotelTypesFilter from "./hotelTypesFilter";
import Pagination from "./pagination";
import PriceFilter from "./priceFilter";
import SearchResultsCard from "./searchResultsCard";
import StarRatingFilter from "./starRatingFilter";

function Search() {
  const [searchData, setSearchData] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [flexValueFirst, setFlexValueFirst] = useState(1);
  const [flexValueSecond, setFlexValueSecond] = useState(4);

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const SearchParams = {
          page: page,
          stars: selectedStars,
          types: selectedHotelTypes,
          facilities: selectedFacilities,
          maxPrice: selectedPrice?.toString(),
        };
        const { data } = await api.searchHotels(SearchParams);

        setSearchData(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
        // Handle error (e.g., show error message)
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [
    page,
    selectedStars,
    selectedHotelTypes,
    selectedFacilities,
    selectedPrice,
  ]);

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="flex flex-row justify-between flex-1">
      <div style={{ margin: 5, flex: window.innerWidth < 1024 ? 1 : 1 }}>
        <div className="space-y-5 rounded-lg border border-slate-300 p-5 h-fit top-10 sticky ">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div style={{ margin: 5, flex: window.innerWidth < 1024 ? 2 : 4 }}>
        <div className="flex flex-col gap-4">
          {loading && <div>Loading...</div>}
          {searchData?.data?.length === 0 ? (
            <div>No record found</div>
          ) : (
            searchData?.data?.map((item: any, index: number) => (
              <SearchResultsCard key={index} hotel={item} />
            ))
          )}
        </div>
        <div className="pt-4">
          <Pagination
            page={searchData?.pagination.page || 1}
            pages={searchData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
