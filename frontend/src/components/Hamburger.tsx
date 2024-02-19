import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

function Hamburger() {
  const [open, setOpen] = useState(false);
  console.log({ open });

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
        </div>
      )}
    </div>
  );
}

export default Hamburger;
