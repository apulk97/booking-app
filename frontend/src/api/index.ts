import axios from "axios";
import { UserInterface } from "../pages/Register/index.types";
import { HotelType } from "../types/index.types";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const signup = (data: UserInterface) => api.post("/users/signup", data);
export const signin = (data: UserInterface) => api.post("/users/signin", data);
export const myHotels = (token: string) => api.get("my-hotels/get", { headers: { Authorization: `bearer ${token}` } });
export const addHotel = (token: string, data: FormData) => api.post("my-hotels/add",data, { headers: { Authorization: `bearer ${token}` } });
export const getHotel = (token: string, id:string) => api.get(`my-hotels/${id}`, { headers: { Authorization: `bearer ${token}` } });
export const search = (token: string) => api.get("hotels/search", { headers: { Authorization: `bearer ${token}` } });
