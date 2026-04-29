import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {

  registerUser,
  removeErrors,
  removeSuccess,
} from "../features/User/UserSlice";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.user);

  
  
  useEffect(() => {
    if (error) {
      toast.error("Could not registerd User");
      dispatch(removeErrors());
    }
  },[dispatch,error]);

  useEffect(() => {
    if (success) {
      toast.success("Successfully Registerd");
      dispatch(removeSuccess());
      navigate("/admin-dashboard");
    }
  },[dispatch,success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({name,email,password}))
  };

  return (
    <>
      <div
        className="flex flex-col items-center h-screen justify-center bg-gradient-to-b bg-cyan-950
    from-50% to-gray-100 to-50% space-y-6"
      >
        <div className="form-container container ">
          <div className="bordrer shadow p-6 w-80 bg-white rounded-2xl border-amber-50 ">
            <h4 className=" py-5 items-center justify-center text-2xl text-center">
              Sign UP
            </h4>
            <form action="" className="form " onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPasswrod(e.target.value)}
                />
              </div>
              <button className="authBtn">Sign In</button>

              <p className="form-link">
                Dont have an accoutn? <Link to="/register">Sign up here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
