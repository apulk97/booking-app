import axios from "axios";
import { UserInterface } from "../pages/Register/index.types";
import { BookingFromReq } from "../types/index.types";
import { useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
// const dispatch = useDispatch()
// const navigate = useNavigate();


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""
const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token") ?? "")}`;
  }
  return req;
});


// api.interceptors.response.use((response)=>{
//   if(response.status==403){
//     dispatch(signout())
//     navigate('/')
//   }
//   return response
  
// })

export const signup = (data: UserInterface) => api.post("/api/users/signup", data);
export const signin = (data: UserInterface) => api.post("/api/users/signin", data);
export const getUserInfo = () => api.get("/api/users/me");

export const myHotels = () => api.get("/api/my-hotels/get");
export const addHotel = (data: FormData) => api.post("/api/my-hotels/add", data);
export const editHotel = (id:string, data: FormData) => api.put(`/api/my-hotels/${id}`, data);
export const getHotel = (id: string) => api.get(`/my-hotels/${id}`);

export const searchHotels = (queryParams: object) => api.get("/api/hotels/search", { params: queryParams });
export const getHotelById = (hotelId: string) => api.get(`/api/hotels/${hotelId}`);
export const createPaymentIntent = (hotelId: string, numberOfNights: number) => api.post(`/api/hotels/${hotelId}/bookings/payment-intent`, { numberOfNights });
export const bookRoom = (data: BookingFromReq, hotelId: string) => api.post(`/api/hotels/${hotelId}/bookings`, data);

export const getBookings = () => api.get('/api/my-bookings/')
