import ContentEditable from "react-contenteditable";
import Loader from "../Loader";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "../../assets/images/placeholder.png";
import { useEffect, useState, useRef, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ChatContext } from "../../context/ChatContext";
import moment from "moment";
import NewChat from "./NewChat";
import { FaRegSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const ChatBox = ({
  page,
  chatBoxMobile,
  handleBackButton,
  contact,
  chatBox,
  setContact
}) => {
  const {
    state: { messages, loading },
    sendMessage,
  } = useContext(ChatContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const [showPicker, setShowPicker] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [content, setContent] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    setMessageData(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setContent("");
    /* setMessageData((prev) => [
      ...prev,
      {
        created_at: Date.now(),
        message: content,
        message_type: "sent",
      },
    ]); */
    sendMessage(user.uuid, contact.uuid, content);
  };

  const parseDate = (dateString) => {
    const parsedDate = moment(dateString);

    const currentDate = moment();

    let result = "";

    if (currentDate.isSame(parsedDate, "day")) {
      result = `Today, ${parsedDate.format("h:mm a")}`;
    } else if (currentDate.isSame(parsedDate, "week")) {
      result = `${parsedDate.format("dddd h:mma")}`;
    } else {
      result = `${parsedDate.format("M/D/YYYY h:mma")}`;
    }
    return result;
  };

  const selectEmoji = (emojiData) => {
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  return (
    <div className={`chat-box ${chatBoxMobile}`}>
      <div className="chat-mobile-top d-md-none d-flex">
        <IoArrowBack size={20} onClick={handleBackButton} />
        <div className="name">John Doe</div>
      </div>
      <div className="chat-top">
        {chatBox == "new" ? (
          <NewChat setContact={setContact} />
        ) : (
          <div ref={containerRef} className="chat-area">
            {loading ? (
              <Loader fullHeight={false} />
            ) : (
              messageData.map((item, index) => {
                const sender = item.message_type == "sent" ? user : contact;
                const time = parseDate(item.created_at);
                return (
                  <div className="chat-item" key={"message" + index}>
                    <img
                      src={sender.image || Avatar}
                      height={35}
                      width={35}
                      className="chat-avatar"
                    />
                    <div className="details">
                      <div className="sender">
                        {sender.first_name + " " + sender.last_name}
                        <span className="time">{time}</span>
                      </div>
                      <div className="text">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.message }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="chat-footer">
        <div className="message-box">
          <div className="message-input">
            <ContentEditable
              className="message"
              placeholder="Enter your message..."
              html={content}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        <div className="message-actions">
          {page == "lounge" && (
            <>
              <FaRegSmile onClick={() => setShowPicker((val) => !val)} />
              {showPicker && (
                <EmojiPicker
                  previewConfig={{ showPreview: false }}
                  skinTonesDisabled={true}
                  height={250}
                  suggestedEmojisMode=""
                  categories={[
                    "smileys_people",
                    "animals_nature",
                    "food_drink",
                    "travel_places",
                    "activities",
                    "objects",
                    "symbols",
                    "flags",
                  ]}
                  onEmojiClick={selectEmoji}
                />
              )}
              <FaPaperclip />
            </>
          )}
          <div className="send-message">
            <button className="btn btn-send" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
