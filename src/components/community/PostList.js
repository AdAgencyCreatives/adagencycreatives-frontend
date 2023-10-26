import {
  IoArrowRedoSharp,
  IoChatbubbleEllipsesOutline,
  IoEllipsisVertical,
  IoHeartOutline,
  IoPencilOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";
import UserAvatar from "../../assets/images/user1.jpg";
import Miami from "../../assets/images/Miami.png";
import { useState } from "react";
import Divider from "../Divider";
import ContentEditable from "react-contenteditable";

import { useContext, useEffect } from "react";
import { Context as CommunityContext } from "../../context/CommunityContext";

const PostList = () => {
  const {
    state: { posts },
    getPosts,
  } = useContext(CommunityContext);

  useEffect(() => {
    getPosts();
  }, []);

  const [actions, setActions] = useState("none");

  return (
    <div className="postlist">
      {posts &&
        posts.map((item, index) => (
          <div className="post-item">
            <div className="post-header">
              <img className="post-avatar" src={UserAvatar} />
              <div className="post-meta">
                <div className="post-username">Ad Agency Creatives</div>
                <div className="post-time">
                  <IoTimeOutline />
                  <span className="time-text">1 hour ago</span>
                </div>
              </div>
              <div className="post-action">
                <div className="action-button">
                  <IoEllipsisVertical
                    onClick={() =>
                      setActions((state) => (state == "show" ? "none" : "show"))
                    }
                  />
                </div>
                <div className={`action-dropdown d-${actions}`}>
                  <ul>
                    <li>
                      <IoPencilOutline /> Edit
                    </li>
                    <li>
                      <IoTrashOutline /> Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="post-content">
              <div className="post-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
                <img src={Miami} />
              </div>
            </div>
            <div className="post-actions">
              <div className="post-action post-likes">
                <IoHeartOutline />
                2.5K
              </div>
              <div className="post-action post-comments">
                <IoChatbubbleEllipsesOutline />
                1.9K
              </div>
            </div>
            <Divider />
            <div className="comment-box">
              <div className="comment-input">
                <ContentEditable placeholder="Comment on this post" html="" />
              </div>
              <h5 className="title-small">Comments</h5>
              <div className="comments">
                <div className="comment">
                  <div className="comment-avatar">
                    <img src={UserAvatar} />
                  </div>
                  <div className="comment-meta">
                    <p className="username">Tony Pawela</p>
                    <p className="content">
                      I can guarantee it’s not you, it’s them. I’ve tried all those
                      techniques and then some. No real success either. Not sure
                      there’s a secret other than keep it short, try to make it
                      personal and don’t think twice about it. You’re good enough.
                      You’re smart enough. And doggone it, people like you!
                    </p>
                    <div className="reply-section">
                      <IoArrowRedoSharp />
                      Reply Comment
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="all-comments-button">
                  <span>View all comments</span>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PostList;
