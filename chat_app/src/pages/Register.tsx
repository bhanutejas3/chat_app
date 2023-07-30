import React, { useEffect, useState } from "react";
import logo from "../assets/icons8-telegram-app.svg";
import InputItem from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authRoute, registerRoute } from "../utils/ApiRoutes";
import LoaderItems from "../components/loader";

import { useCookies } from "react-cookie";
import NavigationBar from "../components/navigationBar";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const [cookies] = useCookies([key]);
  const [loading, setLoading] = useState(false);
  const tostOption_error = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies.token);
      setLoading(true);
      const { data } = await axios.post(
        authRoute,
        {},
        { withCredentials: true }
      );
      setLoading(false);
      if (data.status) {
        navigate("/chat");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dataValidation()) {
      const { username, password, email } = values;
      setLoading(true);
      const { data } = await axios.post(
        registerRoute,
        {
          username,
          password,
          email,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (data.status === false) {
        tostOption_error(data.message);
      }

      if (data.status === true) {
        localStorage.setItem(key, JSON.stringify(data.user.id));
        navigate("/chat");
      }
    }
  };

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const dataValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password != confirmPassword) {
      tostOption_error("Entered password and confirmed password are not same");
      return false;
    } else if (!isEmail(email)) {
      tostOption_error("Entered email is not in the correct formate");
      return false;
    } else if (username.length < 3) {
      tostOption_error("Entered username is less than 3 characters");
      return false;
    }
    return true;
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavigationBar logoutButton={false}></NavigationBar>
      <div className="main">
        {loading ? (
          <div className="main">
            <LoaderItems />
          </div>
        ) : (
          <form
            className="form_input"
            action=""
            onSubmit={(event) => handelSubmit(event)}
          >
            <div className="brand">
              <img className="logo" src={logo} alt="Logo"></img>
              <h1 className="app_name">Chat app</h1>
            </div>
            <div className="test">
              <InputItem
                inputType="email"
                name="email"
                placeholder="email"
                inputData={handleInput}
              />
              <InputItem
                inputType="username"
                name="username"
                placeholder="username"
                inputData={handleInput}
              />
              <InputItem
                inputType="password"
                name="password"
                placeholder="password"
                inputData={handleInput}
              />
              <InputItem
                inputType="password"
                name="confirmPassword"
                placeholder="confirm Password"
                inputData={handleInput}
              />
              <button type="submit" className="submit_user">
                Create User
              </button>
              <span className="link_login">
                Already have a account with us?{" "}
                <Link className="login_link" to="/login">
                  login
                </Link>
              </span>
            </div>
          </form>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
