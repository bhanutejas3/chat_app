import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderItems from "../components/loader";
import { ToastContainer, toast } from "react-toastify";

function AvatarSetting() {
  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const api: string = import.meta.env.VITE_AVATAR_API;
  const [cookies] = useCookies([key]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    const verifyCookie = async () => {
      setLoading(true);
      const { data } = await axios.post(
        authRoute,
        {},
        { withCredentials: true }
      );
      setLoading(false);
      if (!data.status) {
        navigate("/");
      }
    };
    // verifyCookie();
  }, [cookies, navigate]);

  const tostOption_error = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
    });
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
  };

  useEffect(() => {
    const av = async () => {
      const data: string[] = [];
      for (let i = 0; i < 4; i++) {
        const apiString = api + Math.round(Math.random() * 1000);
        const image: string = await axios.get(apiString);
        const buffer =
          "data:image/svg+xml;base64," +
          btoa(decodeURIComponent(encodeURIComponent(image)));
        data.push(buffer);
        console.log(data);
      }
      setAvatar(data);
    };
    av();
  });

  return (
    <>
      {loading ? (
        <LoaderItems />
      ) : (
        <div className="main">
          <div className="title-container">
            <h1 className="avatarTitle">
              Pick an Avatar as your profile picture
            </h1>
          </div>
          <form
            className="form_input"
            action=""
            onSubmit={(event) => handelSubmit(event)}
          >
            {avatar.map((value, id) => {
              return <img src={value} key={id}></img>;
            })}
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default AvatarSetting;
