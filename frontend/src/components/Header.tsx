import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signout } from "../slices/authSlice";
import useWindowDimensions from "../utils/useWindowDimensions";
import Hamburger from "./Hamburger";

const Header = () => {
  const { authData } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = localStorage.getItem("profile");
  const dispatch: AppDispatch = useDispatch();
  const { width } = useWindowDimensions();

  const renderNavSection = () =>
    width < 768 ? (
      <Hamburger />
    ) : (
      <nav className="flex gap-6">
        <span className="text-white font-bold text-xl">
          <Link to="/my-bookings">My Bookings</Link>
        </span>
        <span className="text-white font-bold text-xl">
          <Link to="/my-hotels">My Hotels</Link>
        </span>

        <button className="bg-white text-blue-600 font-bold px-3" onClick={() => dispatch(signout())}>
          <Link to="/">Sign Out</Link>
        </button>
      </nav>
    );
  return (
    <div className="bg-blue-800 py-6 w-full">
      <ToastContainer />
      <div className="container flex justify-between mx-auto">
        <span className="text-white font-bold text-3xl">
          <Link to="/">Booking.com</Link>
        </span>
        {isLoggedIn ? (
          renderNavSection()
        ) : (
          <div className="flex">
            <button className="bg-white text-blue-600 font-bold px-3">
              <Link to="/signin">Sign in</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
