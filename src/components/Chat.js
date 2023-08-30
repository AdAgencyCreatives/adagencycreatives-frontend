import { IoAdd, IoSend } from "react-icons/io5";
import Avatar from "../assets/images/user1.jpg";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../styles/Chat.scss";

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="row g-0">
        <div className="col-md-5 col-12">
          <div className="users-box">
            <div className="box-header">
              <div className="box-title">Direct Messages</div>
              <div className="new-chat">
                <IoAdd />
              </div>
            </div>
            <div className="box-content">
              <ul className="users-list">
                <li className="active">
                  <img src={Avatar} height={40} width={40} />
                  <div className="user-details">
                    <div className="username">John Doe</div>
                    <div className="user-message">
                      Lorem ipsum dolor sit amet, consectetur
                    </div>
                  </div>
                  <div className="message-time unread">10m ago</div>
                </li>
                <li>
                  <img src={Avatar} height={40} width={40} />
                  <div className="user-details">
                    <div className="username">John Doe</div>
                    <div className="user-message">
                      Lorem ipsum dolor sit amet, consectetur
                    </div>
                  </div>

                  <div className="message-time unread">10m ago</div>
                </li>
                <li>
                  <img src={Avatar} height={40} width={40} />
                  <div className="user-details">
                    <div className="username">John Doe</div>
                    <div className="user-message">
                      Lorem ipsum dolor sit amet, consectetur
                    </div>
                  </div>
                  <div className="message-time">10m ago</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-12">
          <div className="chat-box">
            <div className="chat-area">
              <div className="chat-item">
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className="details">
                  <img src={Avatar} height={35} width={35} />
                  <span className="time">Sent 1:40pm</span>
                </div>
              </div>
              <div className="chat-item self">
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className="details">
                  <span className="time">Sent 1:40pm</span>
                </div>
              </div>
            </div>
            <div className="chat-footer">
              <div className="user-avatar">
                <img src={Nathan} height={40} width={40} />
              </div>
              <div className="message-input">
                <input className="message form-control" placeholder="Enter your message"/>
              </div>
              <button className="btn send-message">
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
