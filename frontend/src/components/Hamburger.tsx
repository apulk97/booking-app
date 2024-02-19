import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { signout } from "../slices/authSlice";

function Hamburger() {
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex flex-col items-end relative">
      <button onClick={() => setOpen((prev) => !prev)}>
        {open ? <MdOutlineClose color="white" size={24} /> : <GiHamburgerMenu color="white" size={24} />}
      </button>

      {open && (
        <div className="top-8 flex flex-col p-4 gap-2 bg-white absolute">
          <span className="text-blue-600 font-bold text-lg">
            <Link to="/my-bookings" style={{ whiteSpace: "nowrap", display: "inline" }}>
              My Bookings
            </Link>
          </span>
          <span className="text-blue-600 font-bold text-lg">
            <Link to="/my-hotels">My Hotels</Link>
          </span>
          <span className="text-blue-600 font-bold text-lg">
          <button className="bg-white text-blue-600 font-bold" onClick={() => dispatch(signout())}>
          <Link to="/">Sign Out</Link>
        </button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Hamburger;
