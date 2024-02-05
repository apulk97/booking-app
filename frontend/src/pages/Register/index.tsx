import React, { useState } from "react";
import "./register.css";
import { UserInterface } from "./index.types";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
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
  const dispatch: AppDispatch = useDispatch()
  const { authData, loading } = useSelector((state: RootState) => state.auth)
  console.log(authData, loading);
  

  const updateForm = (key: string, val: string): void => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(signup({formData, navigate}));
    } catch (error) {
      // Handle error (if needed)
      console.error("Signup failed", error);
    }
  }

  return (
    <div className="main">
      <h2>Sign Up</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="flex1">
            <label>First Name</label>
            <input
              type="text"
              value={formData.firstName}
              className="input"
              onChange={(e) => updateForm("firstName", e.target.value)}
            />
          </div>
          <div className="flex1">
            <label>Last Name</label>
            <input
              type="text"
              className="input"
              value={formData.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="form-field">
          <label>Email Address</label>
          <input
            type="email"
            className="input"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            className="input"
            value={formData.password}
            onChange={(e) => updateForm("password", e.target.value)}
          />
        </div>
        <div className="footer">
          <input type="submit" value={'Sign Up'} />
        </div>
      </form>
    </div>
  );
}

export default Register;
