import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface SearchFormInterface {
    destination: string,
    adultCount: number,
    childCount: number,
    checkinDate: string,
    checkoutDate: string
  }
  
  export const initialSearch = {
    destination: '',
    adultCount: 1,
    childCount: 1,
    checkinDate: new Date().toISOString(),
    checkoutDate: new Date().toISOString()
  }

const searchSlice = createSlice({
    name: 'search',
    initialState: {search: initialSearch},
    reducers: {
        updateSearchForm : (state, {payload}: PayloadAction<SearchFormInterface>) => {
            state.search = payload
        }
    }
})

export const {updateSearchForm} = searchSlice.actions
export default searchSlice.reducer