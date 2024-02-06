import { Request, Response } from "express"
import Hotel from "../models/hotels"
import { HotelType } from "../shared/index.types"
import { CustomRequest } from "../middleware/auth"
export const addHotel = async (req: CustomRequest, res: Response) => {
    try {
        const newHotel: HotelType = req.body
        newHotel.userId = req.userId ?? ''
        newHotel.lastUpdated = new Date()
        const result =  await Hotel.create(newHotel)
        res.status(201).json({result})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}