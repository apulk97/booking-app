import { Request, Response } from "express";
import Stripe from "stripe";
import Hotel from "../models/hotels";
import { CustomRequest } from "../middleware/auth";
import { BookingType, HotelType, HotelsPagination, PaymentIntentResponse } from "../shared/index.types";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export const getAllHotels = async (req: Request, res: Response) => {
  const pageSize = 5;
  const pageNumber = parseInt(req.query.page?.toString() || "1");
  const skip: number = (pageNumber - 1) * pageSize;

  let sortOptions = {};
  switch (req.query.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const query = constructQuery(req.query);
  try {
    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
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

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = req.params.id?.toString() ?? "";
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching hotel" });
  }
};

export const createPaymentIntent = async (req: CustomRequest, res: Response) => {
  const hotelId = req.params.hotelId;
  const userId = req.userId as string;
  const { numberOfNights } = req.body;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }
  const totalAmount = numberOfNights * hotel.pricePerNight;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    metadata: {
      hotelId,
      userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: "Error creating payment intent" });
  }

  const response: PaymentIntentResponse = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalAmount,
  };

  res.status(200).json(response);
};

export const addBooking = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const hotelId = req.params.hotelId;
  const { paymentIntentId } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

  if (!paymentIntent) {
    return res.status(400).json({ message: "payment intent not found" });
  }

  if (paymentIntent.metadata.hotelId !== hotelId || paymentIntent.metadata.userId !== userId) {
    return res.status(400).json({ message: "payment intent mismatch" });
  }

  if (paymentIntent.status !== "succeeded") {
    return res.status(400).json({
      message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
    });
  }

  const booking: BookingType = {
    ...req.body.data,
    userId,
  };

  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      {
        $push: { bookings: booking },
      }
    );
    

    if (!hotel) {
      return res.status(400).json({ message: "hotel not found" });
    }

    await hotel.save();
    res.status(200).send();
  } catch (err) {
    console.log(err);
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

  return updatedQuery;
};
