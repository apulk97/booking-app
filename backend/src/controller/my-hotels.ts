import { Request, Response } from "express";
import {Multer} from 'multer'
import cloudinary from 'cloudinary'
import Hotel from "../models/hotels";
import { HotelType } from "../shared/index.types";
import { CustomRequest } from "../middleware/auth";

export const addHotel = async (req: CustomRequest, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const imageUrls = await uploadImages(imageFiles);
    const newHotel: HotelType = req.body;
    newHotel.imageUrls = imageUrls
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
    const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
    res.status(201).json(hotel)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

async function uploadImages(imageFiles: Express.Multer.File[] = []) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
