import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export default function HotelDetail() {
  const { hotelId } = useParams();
  return <div>{`Hotel Detail ${hotelId}`}</div>;
}
