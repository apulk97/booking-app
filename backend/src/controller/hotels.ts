import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelType, HotelsPagination } from "../shared/index.types";

export const getAllHotels = async (req: Request, res: Response) => {
  const pageSize = 5;
  const pageNumber = parseInt(req.query.page?.toString() || "1");
  const skip: number = (pageNumber - 1) * pageSize;
  console.log(req.query, "queryy");

  const query = constructQuery(req.query);
  try {
    const hotels = await Hotel.find(query).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();
    const response: HotelsPagination = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err, "err");
    res.status(500).json({ message: "Something went wrong" });
  }
};

const constructQuery = (queryParams: any) => {
  let updatedQuery: any = {};
  if (queryParams.destination) {
    updatedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    updatedQuery.adultCount = { $gte: parseInt(queryParams.adultCount) };
  }

  if (queryParams.childCount) {
    updatedQuery.childCount = { $gte: parseInt(queryParams.childCount) };
  }

  if (queryParams.maxPrice) {
    updatedQuery.pricePerNight = { $lte: parseInt(queryParams.maxPrice) };
  }

  if (queryParams.facilities) {
    updatedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    updatedQuery.type = { $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types] };
  }

  if (queryParams.stars) {
    updatedQuery.starRating = { $in: Array.isArray(queryParams.stars) ? queryParams.stars : [queryParams.stars] };
  }
  console.log(updatedQuery, "updatedQuery");

  return updatedQuery;
};
