import { Link, useNavigate } from "react-router-dom";
import { UserInterface } from "../Register/index.types";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signin } from "../../slices/authSlice";

function Login() {
  const initialVal: UserInterface = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<UserInterface>(initialVal);
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { authData, loading } = useSelector((state: RootState) => state.auth);
  console.log(authData, loading);

  const updateForm = (key: string, val: string): void => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signin({ formData, navigate }));
    } catch (error) {
      // Handle error (if needed)
      console.error("Signup failed", error);
    }
  };
  return (
    <div className="border border-slate-300 rounded drop-shadow p-4 flex flex-col py-5 px-5">
      <h2 className="text-3xl font-bold px-0 py-2">Sign In</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
        <div className="form-field">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email Address
          </label>
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Password
          </label>
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
            value={formData.password}
            onChange={(e) => updateForm("password", e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text">
            Not Registered?{" "}
            <Link className="underline" to="/register">
              Create an account here
            </Link>
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-xl "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
