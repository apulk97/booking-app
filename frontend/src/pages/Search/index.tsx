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

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
         const SearchParams= {
          page: page
          // Define other parameters here
        }
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
  }, [page]);

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
        <div>
          {loading && <div>Loading...</div>}
          {searchData?.data?.length === 0 ? (
            <div>No record found</div>
          ) : (
            searchData?.data?.map((item: any, index: number) => (
              <SearchResultsCard key={index} hotel={item} />
            ))
          )}
        </div>
        <div>
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
