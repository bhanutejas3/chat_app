import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authRoute, avatarUpdateRoute, avatarRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderItems from "../components/loader";
import { ToastContainer, toast } from "react-toastify";

function AvatarSetting() {
  const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const userId: string = import.meta.env.VITE_LOCALHOST_ID;
  const [cookies] = useCookies([key]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([""]);
  const [selectedAvatar, setSelectedAvatar] = useState(-1);

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        authRoute,
        {},
        { withCredentials: true }
      );

      if (!data.status) {
        navigate("/");
      }
    };
    setLoading(true);
    verifyCookie();
    av();
    // setLoading(false);
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
    if (selectedAvatar < 0) {
      tostOption_error("Please Select a Profile Picture");
    } else {
      const id = localStorage.getItem(userId);
      console.log(avatar[selectedAvatar]);
      setLoading(true);
      const { data } = await axios.post(avatarUpdateRoute, {
        avatar: avatar[selectedAvatar],
        id,
      });
      setLoading(false);

      if (data.status) {
        const userDetails = [data.user._id, data.user.avatarImage];
        localStorage.setItem(userId, JSON.stringify(userDetails));
        navigate("/chat");
      } else {
        tostOption_error("Unable To Update Profile Picture. Please Try Later");
      }
    }
  };

  const av = async () => {
    setLoading(true);
    const image: string[] = [];
    const randomArray = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 100000)
    );

    for (let i = 0; i < randomArray.length; i++) {
      const { data } = await axios.post(
        avatarRoute,
        {
          avatarID: randomArray[i],
        },
        { withCredentials: true }
      );
      image.push(`data:image/svg+xml;base64,${btoa(data.user)}`);
    }
    setAvatar(image);
    setLoading(false);
  };

  return (
    <div className="main">
      {loading ? (
        <LoaderItems />
      ) : (
        <>
          <div className="title-container">
            <h1 className="avatarTitle">
              Pick an Avatar as your profile picture
            </h1>
          </div>
          <form
            className="form_avatar"
            action=""
            onSubmit={(event) => handelSubmit(event)}
          >
            {avatar.map((value, id) => {
              return (
                // className={`avatar ${id }`
                <div
                  className={`avatar ${
                    selectedAvatar === id ? "selected" : ""
                  }`}
                  key={id}
                >
                  <img
                    className="avatarImg"
                    src={value}
                    key={id}
                    alt="avatar"
                    onClick={() => {
                      setSelectedAvatar(id);
                    }}
                  ></img>
                </div>
              );
            })}
            <button type="submit" className="submit_user profile_picture_btn">
              Set Profile Picture
            </button>
          </form>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default AvatarSetting;
