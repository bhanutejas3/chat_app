import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { getAllUsers } from "../utils/ApiRoutes";
import LoaderItems from "./loader";
import logo from "../assets/icons8-wechat.svg";

const Contacts = (props: { currentUserName: string; chatButton }) => {
  const [loading, setLoading] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    const getAllContacts = async (username: string) => {
      setLoading(true);
      const { data } = await axios.get(`${getAllUsers}/${username}`);
      setLoading(false);
      if (data.status) {
        setAllContacts(data.dataUser);
      } else {
        console.log(data);
      }
    };
    getAllContacts(props.currentUserName);
  }, [props.currentUserName]);

  const onClickChat = (
    value: { avatarImage: string; username: string; _id: string },
    index: number | SetStateAction<undefined>
  ) => {
    setSelected(index);
    props.chatButton(value);
  };

  return (
    <>
      {loading ? (
        <LoaderItems />
      ) : (
        <>
          <div className="contactsSide">
            {allContacts.map(
              (
                value: { avatarImage: string; username: string; _id: string },
                index
              ) => {
                return (
                  <div
                    className={`allContacts ${
                      selected === index ? "selected" : "notSelected"
                    }`}
                    key={index}
                    onClick={() => {
                      onClickChat(value, index);
                    }}
                  >
                    <img
                      className="contactLogo"
                      src={value.avatarImage || logo}
                      alt="logo"
                    ></img>
                    <span className="contactUsername">{value.username}</span>
                  </div>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Contacts;
