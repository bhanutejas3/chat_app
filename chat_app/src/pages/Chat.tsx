import { useEffect, useRef, useState } from "react";
import NavigationBar from "../components/navigationBar";
import host from "../utils/ApiRoutes";
import { authRoute, getAvatarRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { useNavigate } from "react-router";
import LoaderItems from "../components/loader";
import ChatModel from "../components/chatModel";
import Contacts from "../components/contacts";
import logo from "../assets/icons8-wechat.svg";

function Chat() {
  // const key: string = import.meta.env.VITE_LOCALHOST_KEY;
  const navigate = useNavigate();
  const socket = useRef();
  const [loading, setLoading] = useState(false);
  const [chating, setChating] = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setName] = useState({ username: "", id: "" });
  const { username, id } = user;

  useEffect(() => {
    const getLatestAvatar = async (username: string) => {
      const { data } = await axios.get(`${getAvatarRoute}/${username}`);
      if (data.status) {
        setAvatar(data.user.avatarImage);
      } else {
        console.log("No avatar image");
      }

      if (data.user.avatarImage === "") {
        setAvatar(logo);
        console.log(avatar);
      }
    };
    const verifyCookie = async () => {
      setLoading(true);
      const { data } = await axios.post(
        authRoute,
        {},
        { withCredentials: true }
      );
      setLoading(false);
      if (data.status) {
        setName((user) => ({
          ...user,
          username: data.user,
          id: data.id,
        }));
        getLatestAvatar(data.user);
      } else {
        navigate("/");
      }
    };

    verifyCookie();
  }, []);

  const handleChatClick = (event: string) => {
    setChating(event);
  };

  return (
    <>
      {loading || avatar === "" ? (
        <div className="main">
          <LoaderItems />
        </div>
      ) : (
        <>
          <NavigationBar
            logoutButton={true}
            avatarImage={avatar}
          ></NavigationBar>
          <div className="main">
            <div className="wrapper">
              <div className="chat_contacts">
                <h4>Chat Contact</h4>
                <Contacts
                  currentUserName={username}
                  chatButton={handleChatClick}
                />
              </div>
              <div className="chatWindow">
                {chating === "" ? (
                  <>
                    <img src={logo} alt="logo"></img>
                    <p className="defaultMessage">
                      Psst... Your chat adventure awaits! Pick a contact to join
                      the party and start spreading the laughter!
                    </p>
                  </>
                ) : (
                  <ChatModel
                    currentChatName={chating}
                    currentId={id}
                    socket={socket}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Chat;
