import logo from "../assets/icons8-telegram-app.svg";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavigationBar = (props: {
  logoutButton: boolean;
  avatarImage?: string;
}) => {
  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const userId: string = import.meta.env.VITE_LOCALHOST_ID;
  const [, , removeCookie] = useCookies([key]);

  const handleClick = () => {
    removeCookie("token");
    localStorage.removeItem(userId);
  };

  return (
    <div className="navBar">
      <header className="d-flex flex-wrap align-items-center justify-content-md-between py-3 ">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link to="/" className="logo">
            <img className="logo" src={logo} alt="Logo"></img>
            <h1 className="app_name">Chat app</h1>
          </Link>
        </div>
        <div className="col-md-3 text-end">
          {props.logoutButton ? (
            <>
              <img
                src={props.avatarImage}
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              ></img>

              <Link rel="stylesheet" to="/">
                <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link rel="stylesheet" to="/login">
                <button type="button" className="btn btn-primary">
                  Login
                </button>
              </Link>
              <Link rel="stylesheet" to="/register">
                <button type="button" className="btn btn-primary">
                  Sign-up
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavigationBar;
