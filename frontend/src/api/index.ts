import axios from "axios";
import { UserInterface } from "../pages/Register/index.types";
import { BookingFromReq } from "../types/index.types";

const api = axios.create({ baseURL: "http://localhost:8000" });
api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token") ?? "")}`;
  }
  return req;
});

export const signup = (data: UserInterface) => api.post("/users/signup", data);
export const signin = (data: UserInterface) => api.post("/users/signin", data);
export const getUserInfo = () => api.get("/users/me");

export const myHotels = () => api.get("/my-hotels/get");
export const addHotel = (data: FormData) => api.post("/my-hotels/add", data);
export const getHotel = (id: string) => api.get(`/my-hotels/${id}`);

export const searchHotels = (queryParams: object) => api.get("hotels/search", { params: queryParams });
export const getHotelById = (hotelId: string) => api.get(`/hotels/${hotelId}`);
export const createPaymentIntent = (hotelId: string, numberOfNights: number) => api.post(`/hotels/${hotelId}/bookings/payment-intent`, { numberOfNights });
export const bookRoom = (data: BookingFromReq, hotelId: string) => api.post(`/hotels/${hotelId}/bookings`, data);

export const getBookings = () => api.get('my-bookings/')
