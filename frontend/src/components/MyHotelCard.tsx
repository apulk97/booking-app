import { HotelType } from "../../../backend/src/shared/index.types";

interface Props {
    hotelData: HotelType
}

function MyHotelCard(props: Props) {
    const {name, description, city, country, adultCount, childCount, pricePerNight, starRating, type} = props.hotelData
  return (
    <div className="w-full border border-slate-300 rounded p-6 flex flex-col">
      <h2 className="text-2xl font-bold pb-4">{name}</h2>
      <p>
        {description}
      </p>
      <div className="grid grid-cols-5 gap-2 py-3">
        <div className="border border-slate-300 rounded px-2 py-4 flex justify-start">
          <span>{city}, {country}</span>
        </div>
        <div className="border border-slate-300 rounded px-2 py-4 flex justify-start">
          <span>{type}</span>
        </div>
        <div className="border border-slate-300 rounded px-2 py-4 flex justify-start">
          <span>Rs {pricePerNight} per night</span>
        </div>
        <div className="border border-slate-300 rounded px-2 py-4 flex justify-start">
          <span>{adultCount} adults, {childCount} children</span>
        </div>
        <div className="border border-slate-300 rounded px-2 py-4 flex justify-start">
          <span>{starRating} star rating</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="text-white text-xl bg-blue-600 p-2 font-bold">View Details</button>
      </div>
    </div>
  );
}

export default MyHotelCard;
