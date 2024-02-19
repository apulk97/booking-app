import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between">
        <span className="text-white font-bold text-3xl">
          <Link to="/">Booking.com</Link>
        </span>
        <nav className="flex gap-6">
          <span className="text-white font-bold text-l">
            <Link to="/">Privacy Policy</Link>
          </span>
          <span className="text-white font-bold text-l">
            <Link to="/">Terms of Service</Link>
          </span>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
