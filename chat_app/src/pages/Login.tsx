import React, { useEffect, useState } from "react";
import logo from "../assets/icons8-telegram-app.svg";
import InputItem from "../components/Input";
import LoaderItems from "../components/loader";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { authRoute, loginRoute } from "../utils/ApiRoutes";
import NavigationBar from "../components/navigationBar";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const userId: string = import.meta.env.VITE_LOCALHOST_ID;
  const [cookies] = useCookies([key]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
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

  const tostOption_error = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
    });
  };

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dataValidation()) {
      const { username, password } = values;
      setLoading(true);
      try {
        const { data } = await axios.post(
          loginRoute,
          {
            username,
            password,
          },
          { withCredentials: true }
        );
        setLoading(false);

        if (data.status === false) {
          tostOption_error(data.message);
        }

        if (data.status === true) {
          const userDetails = [data.user._id, data.user.avatarImage];
          localStorage.setItem(userId, JSON.stringify(userDetails));
          navigate("/chat");
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  };

  const dataValidation = () => {
    const { username, password } = values;

    if (username === "" || password === "") {
      tostOption_error("Username or Password are required");
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
              <button type="submit" className="submit_user">
                Login
              </button>
              <span className="link_register">
                Don't have a account ?{" "}
                <Link className="register_link" to="/register">
                  register
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

export default Login;
