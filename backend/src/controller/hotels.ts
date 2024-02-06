import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelType } from "../shared/index.types";
import { CustomRequest } from "../middleware/auth";

export const addHotel = async (req: CustomRequest, res: Response) => {
  try {
    const newHotel: HotelType = req.body;
    newHotel.userId = req.userId ?? "";
    newHotel.lastUpdated = new Date();
    const result = await Hotel.create(newHotel);
    res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getHotel = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const hotels = await Hotel.find({ userId: userId });
    res.status(200).json(hotels);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getHotelById = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const hotelId = req.params.id.toString();
    const hotel = await Hotel.findOne({ userId: userId, _id: hotelId });
    res.status(200).json(hotel);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editHotel = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const hotelId = req.params.id.toString();
    const updatedHotel: HotelType = req.body;
    updatedHotel.userId = req.userId ?? ''
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate({ userId: userId, _id: hotelId }, updatedHotel, { new: true });
    if(!hotel) {
        return res.status(404).json('Hotel not found')
    }
    res.status(201).json(hotel)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
