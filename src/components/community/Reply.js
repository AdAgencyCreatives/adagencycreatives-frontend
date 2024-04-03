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

const Comment = (props) => {

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
        if (props.comment.id == reply_added || props.comment.id == reply_updated || props.comment.id == reply_deleted) {
            getComments(props.post.id);
        }
    }, [reply_added, reply_updated, reply_deleted]);

    const onUpdateComment = () => {
        setActions("none");
    };

    const onDeleteComment = () => {
        setActions("none");
        deleteComment(props.post.id, props.comment.uuid);
    };

    return (
        <div className="comment">
            {props.comment.user_id == user.uuid && (
                <div div className="post-action comments">
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
            )}
            <div className="comment-avatar">
                <img src={props.comment.profile_picture || defaultAvatar} />
            </div>
            <div className="comment-meta">
                <p className="username">
                    <a href={"/creative/" + props.comment.user_slug}>
                        {props.comment.user}
                    </a>
                </p>
                <div className="content" dangerouslySetInnerHTML={{ __html: props.comment.content }} />
                <div className="reply-section">
                    <IoArrowRedoSharp />
                    Reply Comment
                </div>
            </div>
        </div >
    );
};

export default Comment;