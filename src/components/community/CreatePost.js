import { IoCameraOutline, IoImageOutline } from "react-icons/io5";
import { FiCamera, FiImage, FiPaperclip } from "react-icons/fi";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";

const CreatePost = () => {
  return (
    <div className="post-form">
      <div className="status-box">
        <div className="user-avatar">
          <img src={Nathan} />
        </div>
        <div className="textarea">
          <textarea
            className="status-input form-control"
            rows={1}
            placeholder="What's on your mind?"
          ></textarea>
        </div>
      </div>
      <div className="divider"></div>
      <div className="status-options">
        <div className="item">
          <FiCamera />
        </div>
        <div className="item">
          <FiImage />
        </div>
        <div className="item">
          <FiPaperclip />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
