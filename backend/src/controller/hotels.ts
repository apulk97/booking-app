import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelType, HotelsPagination } from "../shared/index.types";

export const getAllHotels = async (req: Request, res: Response) => {
  const pageSize = 5;
  const pageNumber = parseInt(req.query.page?.toString() || "1");
  const skip: number = (pageNumber - 1) * pageSize;
  try {
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const totalPages = await Hotel.countDocuments()
    const response: HotelsPagination = {
        data: hotels,
        pagination : {
            totalPages,
            page: pageNumber,
            pages : Math.ceil(totalPages/pageSize)
        }
    }
    res.status(200).json(response)
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({ message: "Something went wrong" });
  }
};
