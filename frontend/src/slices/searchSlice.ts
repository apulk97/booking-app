import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getInitialSearchValues } from "../utils";

export interface SearchFormInterface {
  destination: string;
  adultCount: number;
  childCount: number;
  checkinDate: string;
  checkoutDate: string;
}

export const initialSearch = {
  destination: getInitialSearchValues("destination", ""),
  adultCount: getInitialSearchValues("adultCount", 1),
  childCount: getInitialSearchValues("childCount", 1),
  checkinDate: getInitialSearchValues("checkinDate", new Date().toISOString()),
  checkoutDate: getInitialSearchValues("checkoutDate", new Date().toISOString()),
};

const searchSlice = createSlice({
  name: "search",
  initialState: { search: initialSearch },
  reducers: {
    updateSearchForm: (state, { payload }: PayloadAction<SearchFormInterface>) => {
      state.search = payload;
      sessionStorage.setItem("search", JSON.stringify(payload));
    },
  },
});

export const { updateSearchForm } = searchSlice.actions;
export default searchSlice.reducer;
