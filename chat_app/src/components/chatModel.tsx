import axios from "axios";
import ChatInput from "./chatInput";
import { sendMessage, getAllMessage } from "../utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";

const ChatModel = (props: {
  currentChatName: string;
  currentId: string;
  socket: any;
}) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log(props.currentChatName);
    const allMessage = async () => {
      const { data } = await axios.post(getAllMessage, {
        from: props.currentId,
        to: props.currentChatName._id,
      });
      console.log(data);
      setMessage(data);
    };
    allMessage();
  }, [props.currentChatName]);

  const handleMessage = async (event: string) => {
    await axios.post(sendMessage, {
      from: props.currentId,
      to: props.currentChatName._id,
      message: event,
    });
  };

  return (
    <div className="chatModel">
      <div className="messageDisplay">
        {message.map((msg, index) => {
          return (
            <div
              className={`message ${msg.fromSender ? "sender" : "receiver"}`}
              key={index}
            >
              <div className="messageContent">
                <p>{msg.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleMessage={handleMessage}></ChatInput>
    </div>
  );
};

export default ChatModel;
