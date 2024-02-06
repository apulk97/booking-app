import express from "express";
import { addHotel, editHotel, getHotel, getHotelById } from "../controller/hotels";
import validateToken from "../middleware/auth";

const routers = express.Router();

routers.post("/add", validateToken, addHotel);
routers.get("/get", validateToken, getHotel);
routers.get("/:id", validateToken, getHotelById);
routers.put("/:id", validateToken, editHotel)

export default routers;
