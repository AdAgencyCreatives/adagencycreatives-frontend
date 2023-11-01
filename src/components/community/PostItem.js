import {
    IoArrowRedoSharp,
    IoChatbubbleEllipsesOutline,
    IoEllipsisVertical,
    IoHeart,
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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import TimeAgo from "../TimeAgo";
import NumUnit from "../NumUnit";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import EditPost from "./EditPost";
import CreateComment from "./CreateComment";

import { CookiesProvider, useCookies } from "react-cookie";

const PostItem = (props) => {

    const showMaxLikedBy = 5;
    const showLikedByCookieKey = "post-showLikedBy-" + props.post.id;
    const [cookies, setCookie] = useCookies([showLikedByCookieKey]);

    const setShowLikedBy = (value) => {
        setCookie(showLikedByCookieKey, value, { path: "/" });
    };

    const getShowLikedBy = () => {
        return cookies ? cookies[showLikedByCookieKey] : false;
    };

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        state: { posts, post_likes, like_action, post_comments, },
        getPosts, getLikes, toggleLike, deletePost, getComments,
    } = useContext(CommunityContext);

    const [defaultAvatar, setDefaultAvatar] = useState("https://adagencycreatives.noorsofttechdev.com/static/media/placeholder.12b7e9aaed5e5566bc6a.png");

    const [actions, setActions] = useState("none");
    const [likeActive, setLikeActive] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likedByData, setLikedByData] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [commentContent, setCommentContent] = useState("");

    const toggleShowComments = () => {
        let newState = !showComments;
        setShowComments(newState);

        if (newState) {
            getComments(props.post.id)
        }
    };

    const doToggleLike = (post_id) => {
        console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLike({ "post_id": post_id })
    }

    useEffect(() => {
        if (post_likes && post_likes.data && post_likes.data.data) {
            if (post_likes.post_id && post_likes.post_id != props.post.id) {
                return;
            }
            if (post_likes.data.data.length != likesCount) {
                setLikesCount(post_likes.data.data.length);
            }
            setLikedByData(post_likes.data.data)
            let user_liked = post_likes.data.data.filter(item => item.user_id == user.uuid);
            setLikeActive(user_liked && user_liked.length);
        } else {
            setLikesCount(props.post.likes_count);
            getLikes({ "post_id": props.post.id });
        }
    }, [post_likes]);

    useEffect(() => {
        if (like_action && like_action.action) {
            if (props.post.id != like_action.post_id) {
                return;
            }
            switch (like_action.action) {
                case "like_begin": console.log('Like Begin for Post ID: ' + like_action.post_id); break;
                case "like_success":
                    console.log('Like Succeed for Post ID: ' + like_action.post_id);
                    setLikesCount(likesCount + (!likeActive ? 1 : -1));
                    setLikeActive(!likeActive);
                    getLikes({ "post_id": props.post.id });
                    break;
                case "like_failed": console.log('Like Failed for Post ID: ' + like_action.post_id + ", Error: " + like_action.error); break;
                default:
                    console.log('Invalid Like Action for Post ID: ' + like_action.post_id);
            }
        }
    }, [like_action]);

    useEffect(() => {
        setLikesCount(props.post.likes_count);
        getLikes({ "post_id": props.post.id });
    }, [props.post.likes_count]);

    const onShowLikedBy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowLikedBy(!getShowLikedBy());
        if (!getShowLikedBy()) {
            getLikes({ "post_id": props.post.id });
        }
    };

    const onUpdatePost = () => {
        setActions("none");
    };

    const onDeletePost = () => {
        setActions("none");
        deletePost(props.post.id);
    };

    return (
        <div className="post-item">
            <div className="post-header">
                <img className="post-avatar" src={props.post.author_avatar || defaultAvatar} />
                <div className="post-meta">
                    <div className="post-username">{props.post.author}</div>
                    <div className="post-time">
                        <IoTimeOutline />
                        <TimeAgo datetime={props.post.updated_at} />,&nbsp;
                        <UtcToLocalDateTime datetime={props.post.updated_at} />
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
                            <EditPost post={props.post} onUpdatePost={onUpdatePost} />
                            <ConfirmDeleteModal onConfirm={onDeletePost} />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="post-content">
                <div className="post-body" dangerouslySetInnerHTML={{ __html: props.post.content }} />
            </div>
            <div className="post-actions">
                <CookiesProvider>
                    <div className={"post-action post-likes" + (likeActive ? ' active' : '')} onClick={() => doToggleLike(props.post.id)}>
                        {likeActive ? (
                            <IoHeart />
                        ) : (
                            <IoHeartOutline />

                        )}
                        <NumUnit number={likesCount} onClick={(e) => onShowLikedBy(e)} />
                    </div>

                    <div className={"post-liked-by-dropdown" + (getShowLikedBy() ? ' d-show' : ' d-none')}>
                        {likedByData && likedByData.slice(0, Math.min(showMaxLikedBy, likedByData.length)).map((like, index) => (
                            <div key={"liked-by-post-" + props.post.id + "-" + like.id} className="liked-by">
                                <img src={like.profile_picture || defaultAvatar} alt="" />
                            </div>
                        ))}
                        <div className="total-likes">
                            {likesCount > showMaxLikedBy ? '+' : ''}{likesCount > 0 ? (likesCount > showMaxLikedBy ? likesCount - showMaxLikedBy : likesCount) : 0} like{likesCount > 1 ? 's' : ''}
                        </div>
                    </div>
                </CookiesProvider>
                <div className="post-action post-comments" onClick={() => toggleShowComments()}>
                    <IoChatbubbleEllipsesOutline />
                    <NumUnit number={props.post.comments_count} />
                </div>
            </div>
            <div key={'comment-box-' + props.post.id} post={props.post} className={"comment-box d-" + (showComments ? 'show' : 'none')}>
                <Divider />
                <div className="comment-input">
                    <CreateComment post={props.post} />
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
                                I can guarantee it’s not you, it’s them. I’ve tried all
                                those techniques and then some. No real success either.
                                Not sure there’s a secret other than keep it short, try to
                                make it personal and don’t think twice about it. You’re
                                good enough. You’re smart enough. And doggone it, people
                                like you!
                                I can guarantee it’s not you, it’s them. I’ve tried all
                                those techniques and then some. No real success either.
                                Not sure there’s a secret other than keep it short, try to
                                make it personal and don’t think twice about it. You’re
                                good enough. You’re smart enough. And doggone it, people
                                like you!
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
    );
};

export default PostItem;