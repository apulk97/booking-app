export type HotelType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}

export interface UserData {
  name: string;
  email: string;
}

export type BookingFormData = {
  name: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type BookingFromReq = {
  data: BookingFormData;
  paymentIntentId: string;
}