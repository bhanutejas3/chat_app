import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = (props: { handleMessage }) => {
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [msg, setMsg] = useState("");

  const handelEmojiInput = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      props.handleMessage(msg);
      setMsg("");
    }
  };

  return (
    <div className="emojimsgInput">
      <div className="emojiInput">
        <div className="emojiButton">
          <BsEmojiSmileFill
            onClick={() => setEmojiClicked(!emojiClicked)}
          ></BsEmojiSmileFill>
          {emojiClicked && (
            <EmojiPicker onEmojiClick={(emoji) => handelEmojiInput(emoji)} />
          )}
        </div>
      </div>
      <form
        className="messageInputContainer"
        onSubmit={(event) => handelSubmit(event)}
      >
        <input
          className="messageInput"
          placeholder="enter the message here"
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        ></input>
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
