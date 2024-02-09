import React, { useState } from "react";
import "./register.css";
import { UserInterface } from "./index.types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { signup } from "../../slices/authSlice";

function Register() {
  const initialVal: UserInterface = {
    firstName: "",
    lastName: "",
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
      await dispatch(signup({ formData, navigate }));
    } catch (error) {
      // Handle error (if needed)
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="border border-solid border-black p-4 flex flex-col py-5 px-5">
      <h2 className="text-3xl font-bold px-5 py-2">Sign Up</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="py-5 px-5">
          <div className="text-gray-700 text-sm font-bold flex-1">
            <label>First Name</label>
            <input
              type="text"
              value={formData.firstName}
              className="border rounded w-full py-1 px-2 font-normal"
              onChange={(e) => updateForm("firstName", e.target.value)}
            />
          </div>
          <div className="text-gray-700 text-sm font-bold flex-1">
            <label>Last Name</label>
            <input
              type="text"
              className="border rounded w-full py-1 px-2 font-normal"
              value={formData.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="text-gray-700 text-sm font-bold flex-1 px-5">
          <label>Email Address</label>
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </div>
        <div className="text-gray-700 text-sm font-bold flex-1 px-5">
          <label>Password</label>
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            value={formData.password}
            onChange={(e) => updateForm("password", e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl border rounded mx-5 my-5">
          <input type="submit" value={"Sign Up"} />
        </button>
      </form>
    </div>
  );
}

export default Register;
