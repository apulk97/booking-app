export type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
};

export type AuthDataType = {
  result: UserType;
  token: string;
};

export type BookingType = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelType = {
  _id?: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities?: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls?: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export interface HotelsPagination {
  data: HotelType[];
  pagination: Pagination;
}

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalAmount: number;
};
