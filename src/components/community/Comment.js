import {
    IoArrowRedoSharp,
    IoEllipsisVertical,
} from "react-icons/io5";

import { useState } from "react";

import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import EditComment from "./EditComment";

import useHelper from "../../hooks/useHelper";
import { Link } from "@mui/material";
import CommentImageLoader from "../CommentImageLoader";

const Comment = (props) => {

    const { injectHyperlinks, getTextLength } = useHelper();
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        state: { posts, post_comments, reply_added, reply_updated, reply_deleted },
        getPosts, deletePost, getComments, deleteComment,
    } = useContext(CommunityContext);

    const [defaultAvatar, setDefaultAvatar] = useState("https://api.adagencycreatives.com/assets/img/placeholder.png");

    const [actions, setActions] = useState("none");

    useEffect(() => {
        if (reply_added || reply_updated || reply_deleted) {
            if (props.comment.id == reply_added || props.comment.id == reply_updated || props.comment.id == reply_deleted) {
                getComments(props.post.id);
            }
        }

    }, [reply_added, reply_updated, reply_deleted]);

    const onUpdateComment = () => {
        setActions("none");
    };

    const onDeleteComment = () => {
        setActions("none");
        deleteComment(props.post.id, props.comment.uuid);
    };

    const processCommentContent = (text) => {
        return injectHyperlinks(text);
    };

    return (
        <div className="comment">
            {props.comment.user_id == user.uuid ? (
                <div className="post-action comments">
                    <div className="action-button">
                        <IoEllipsisVertical
                            onClick={() =>
                                setActions((state) => (state == "show" ? "none" : "show"))
                            }
                        />
                    </div>
                    <div className={`action-dropdown d-${actions}`}>
                        <ul>
                            <EditComment post={props.post} comment={props.comment} onUpdateComment={onUpdateComment} />
                            <ConfirmDeleteModal title="Confirm Delete Comment?" message="Are you sure to delete this comment?" onConfirm={onDeleteComment} />
                        </ul>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="comment-avatar">
                <CommentImageLoader comment={props.comment} height={50} width={50} />
            </div>
            <div className="comment-meta">
                <p className="username">
                    <a href={"/creative/" + props.comment.user_slug}>
                        {props.comment.user}
                    </a>
                    <span className="badge bg-primary" style={{ marginLeft: '10px' }}>{props.comment.edited_at ? "Edited" : ""}</span>
                </p>
                <div
                    className={`content ${!showMoreClicked && getTextLength(props.comment.content) > 500 ? " comment-preview" : ""}`}
                    dangerouslySetInnerHTML={{ __html: processCommentContent(props.comment.content) }}
                />
                {/* <div className="reply-section">
                    <IoArrowRedoSharp />
                    Reply Comment
                </div> */}
                {getTextLength(props.comment.content) > 200 && (
                    <div className="show-more-container">
                        <Link className="show-more" onClick={(e) => {
                            setShowMoreClicked(value => !value);
                        }}>... Show {showMoreClicked ? "Less" : "More"}</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;