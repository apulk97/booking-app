import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/index.types";

export const getBookings = async (req: CustomRequest, res: Response) => {
  const { userId } = req;
  try {
    let hotels: HotelType[] = (await Hotel.find({ bookings: { $elemMatch: { userId: userId } } })) ?? [];
    console.log(hotels);
    
    if (hotels?.length) {
      hotels = hotels.map((hotel) => {
        let bookings = hotel.bookings.filter((item) => item.userId === userId);
        hotel.bookings = bookings;
        return hotel;
      });
    }
    return res.status(200).send(hotels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
