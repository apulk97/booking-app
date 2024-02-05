import { Link, useNavigate } from "react-router-dom";
import "./login.css";
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
      await dispatch(signin({formData, navigate}));
    } catch (error) {
      // Handle error (if needed)
      console.error("Signup failed", error);
    }
  };
  return (
    <div className="main">
      <h2>Sign In</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <p className="text">
            Not registered ? <Link to="/register">Create an account here</Link>
          </p>
          <input type="submit" value={"Sign in"} />
        </div>
      </form>
    </div>
  );
}

export default Login;
