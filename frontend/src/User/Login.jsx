import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrors, removeSuccess } from "../features/User/UserSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const nivagate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state?.user,
  );

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Logedin Successfully");
      nivagate("/admin-dashboard");
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <>
     <div
      className="flex flex-col items-center h-screen justify-center bg-gradient-to-b bg-cyan-950
    from-50% to-gray-100 to-50% space-y-6"
    >
      <div className="form-container container ">
        <div className="bordrer shadow p-6 w-80 bg-white rounded-2xl border-amber-50 ">
            <h4 className=" py-5 items-center justify-center text-2xl">Login</h4>
          <form action="" className="form " onSubmit={submitForm}>
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
            <button className="authBtn" >Sign In</button>

            <p className="form-link">
              Dont have an accoutn?{" "}
              <Link to="/user/register">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
