import {
    IoArrowRedoSharp,
    IoChatbubbleEllipsesOutline,
    IoEllipsisVertical,
    IoHeart,
    IoHeartOutline,
    IoPencilOutline,
    IoThumbsUp,
    IoThumbsUpOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";
import { FaLaughBeam, FaRegLaughBeam } from "react-icons/fa";
import { FaFaceLaughBeam, FaRegThumbsUp } from "react-icons/fa6";

import UserAvatar from "../../assets/images/user1.jpg";
import Miami from "../../assets/images/Miami.png";
import { useState, useRef } from "react";
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
import Comment from "./Comment";
import useHelper from "../../hooks/useHelper";

import { CookiesProvider, useCookies } from "react-cookie";

const PostItem = (props) => {

    const { injectHyperlinks } = useHelper();

    const showMaxLikedBy = 5;
    const showLikedByCookieKey = "post-showLikedBy-" + props.post.id;

    const showMaxLaughedBy = 5;
    const showLaughedByCookieKey = "post-showLaughedBy-" + props.post.id;

    const showMaxLovedBy = 5;
    const showLovedByCookieKey = "post-showLovedBy-" + props.post.id;
    const [cookies, setCookie] = useCookies([showLikedByCookieKey, showLaughedByCookieKey, showLovedByCookieKey]);

    const setShowLikedBy = (value) => {
        setCookie(showLikedByCookieKey, value, { path: "/" });
    };
    const setShowLaughedBy = (value) => {
        setCookie(showLaughedByCookieKey, value, { path: "/" });
    };
    const setShowLovedBy = (value) => {
        setCookie(showLovedByCookieKey, value, { path: "/" });
    };

    const getShowLikedBy = () => {
        return cookies ? cookies[showLikedByCookieKey] : false;
    };


    const getShowLaughedBy = () => {
        return cookies ? cookies[showLaughedByCookieKey] : false;
    };


    const getShowLovedBy = () => {
        return cookies ? cookies[showLovedByCookieKey] : false;
    };

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        state: { posts, post_likes, like_action, post_laughs, laugh_action, post_loves, love_action, post_updated, post_comments, comment_added, comment_updated, comment_deleted },
        getPosts, getLikes, toggleLike, getLaugh, toggleLaugh, getLove, toggleLove, deletePost, getComments
    } = useContext(CommunityContext);

    const [defaultAvatar, setDefaultAvatar] = useState("https://adagencycreatives.noorsofttechdev.com/static/media/placeholder.12b7e9aaed5e5566bc6a.png");

    const [postContent, setPostContent] = useState("");
    const [actions, setActions] = useState("none");
    const [likeActive, setLikeActive] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likedByData, setLikedByData] = useState([]);
    const [laughActive, setLaughActive] = useState(false);
    const [laughsCount, setLaughsCount] = useState(0);
    const [laughByData, setLaughByData] = useState([]);
    const [loveActive, setLoveActive] = useState(false);
    const [lovesCount, setLovesCount] = useState(0);
    const [loveByData, setLoveByData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [commentContent, setCommentContent] = useState("");
    const [viewAllCommentsClicked, setViewAllCommentsClicked] = useState(false);

    const toggleShowComments = () => {
        let newState = !showComments;
        setShowComments(newState);
    };

    const viewAllComments = () => {
        getComments(props.post.id)
        setViewAllCommentsClicked(true);
    };

    const doToggleLike = (post_id) => {
        // console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLike({ "post_id": post_id })
    }

    const doToggleLaugh = (post_id) => {
        // console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLaugh({ "post_id": post_id, type: "laugh" })
    }


    const doToggleLove = (post_id) => {
        // console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLove({ "post_id": post_id, type: "heart" })
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
        if (post_laughs && post_laughs.data && post_laughs.data.data) {
            if (post_laughs.post_id && post_laughs.post_id != props.post.id) {
                return;
            }
            if (post_laughs.data.data.length != laughsCount) {
                setLaughsCount(post_laughs.data.data.length);
            }
            setLaughByData(post_laughs.data.data)
            let user_liked = post_laughs.data.data.filter(item => item.user_id == user.uuid);
            setLaughActive(user_liked && user_liked.length);
        } else {
            setLaughsCount(props.post.reactions.laugh);
            getLaugh({ "post_id": props.post.id });
        }
    }, [post_laughs]);

    useEffect(() => {
        if (post_loves && post_loves.data && post_loves.data.data) {
            if (post_loves.post_id && post_loves.post_id != props.post.id) {
                return;
            }
            if (post_loves.data.data.length != lovesCount) {
                setLovesCount(post_loves.data.data.length);
            }
            setLoveByData(post_loves.data.data)
            let user_liked = post_loves.data.data.filter(item => item.user_id == user.uuid);
            setLoveActive(user_liked && user_liked.length);
        } else {
            setLovesCount(props.post.reactions.heart);
            getLove({ "post_id": props.post.id });
        }
    }, [post_loves]);

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
        if (laugh_action && laugh_action.action) {
            if (props.post.id != laugh_action.post_id) {
                return;
            }
            switch (laugh_action.action) {
                case "laugh_begin": console.log('Laugh Begin for Post ID: ' + laugh_action.post_id); break;
                case "laugh_success":
                    console.log('Laugh Succeed for Post ID: ' + laugh_action.post_id);
                    setLaughsCount(laughsCount + (!laughActive ? 1 : -1));
                    setLaughActive(!laughActive);
                    getLaugh({ "post_id": props.post.id });
                    break;
                case "laugh_failed": console.log('Laugh Failed for Post ID: ' + laugh_action.post_id + ", Error: " + laugh_action.error); break;
                default:
                    console.log('Invalid Laugh Action for Post ID: ' + laugh_action.post_id);
            }
        }
    }, [laugh_action]);

    useEffect(() => {
        if (love_action && love_action.action) {
            if (props.post.id != love_action.post_id) {
                return;
            }
            switch (love_action.action) {
                case "love_begin": console.log('Love Begin for Post ID: ' + love_action.post_id); break;
                case "love_success":
                    console.log('Love Succeed for Post ID: ' + love_action.post_id);
                    setLovesCount(lovesCount + (!loveActive ? 1 : -1));
                    setLoveActive(!loveActive);
                    getLove({ "post_id": props.post.id });
                    break;
                case "love_failed": console.log('Love Failed for Post ID: ' + love_action.post_id + ", Error: " + love_action.error); break;
                default:
                    console.log('Invalid Love Action for Post ID: ' + love_action.post_id);
            }
        }
    }, [love_action]);

    useEffect(() => {
        setLikesCount(props.post.likes_count);
        getLikes({ "post_id": props.post.id });
    }, [props.post.likes_count]);

    useEffect(() => {
        setLaughsCount(props.post.reactions.laugh);
        getLaugh({ "post_id": props.post.id });
    }, [props.post.reactions.laugh]);

    useEffect(() => {
        setLovesCount(props.post.reactions.heart);
        getLove({ "post_id": props.post.id });
    }, [props.post.reactions.heart]);

    useEffect(() => {
        if (post_comments && post_comments.data && post_comments.data.data) {
            if (post_comments.post_id && post_comments.post_id != props.post.id) {
                return;
            }
            if (post_comments.data.data.length != commentsCount) {
                setCommentsCount(post_comments.data.data.length);
            }

            setCommentsData(post_comments.data.data.slice(0, viewAllCommentsClicked ? post_comments.data.data.length : 3));
        } else {
            setCommentsCount(props.post.comments_count);
        }
    }, [post_comments]);

    useEffect(() => {
        if ((comment_added && props.post.id == comment_added.post_id) || (comment_updated && props.post.id == comment_updated.post_id) || (comment_deleted && props.post.id == comment_deleted.post_id)) {
            getComments(props.post.id);
        }
    }, [comment_added, comment_updated, comment_deleted]);

    useEffect(() => {
        if (props.post.comments) {
            setCommentsData(props.post.comments);
            setCommentsData(props.post.comments.slice(0, viewAllCommentsClicked ? props.post.comments.length : 3));
        }
    }, [viewAllCommentsClicked]);

    useEffect(() => {
        if (post_updated && post_updated.id == props.post.id) {
            setPostContent(post_updated.content);
        }
    }, [post_updated]);

    useEffect(() => {
        setPostContent(props.post.content);
    }, []);

    const onShowLikedBy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let newState = !getShowLikedBy();
        setShowLikedBy(newState);
        if (newState) {
            getLikes({ "post_id": props.post.id });
        }
    };

    const onShowLaughedBy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let newState = !getShowLaughedBy();
        setShowLaughedBy(newState);
        if (newState) {
            getLaugh({ "post_id": props.post.id });
        }
    };


    const onShowLovedBy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let newState = !getShowLovedBy();
        setShowLovedBy(newState);
        if (newState) {
            getLove({ "post_id": props.post.id });
        }
    };


    const onUpdatePost = () => {
        setActions("none");
    };

    const onDeletePost = () => {
        setActions("none");
        deletePost(props.post.id);
    };

    const processPostContent = (plainText) => {
        return injectHyperlinks(plainText);
    };

    return (
        <div className="post-item">
            <div className="post-header">
                <img className="post-avatar" src={props.post.author_avatar || defaultAvatar} />
                <div className="post-meta">
                    <div className="post-username">
                        <a className="user-slug" href={"/creative/" + props.post.author_slug}>
                            {props.post.author}
                        </a>
                    </div>
                    <div className="post-time">
                        <IoTimeOutline />
                        <TimeAgo datetime={props.post.updated_at} />
                        {/* <UtcToLocalDateTime datetime={props.post.updated_at} /> */}
                    </div>
                </div>
                {props.post.user_id == user.uuid && (
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
                                <ConfirmDeleteModal title="Confirm Delete Post?" message="Are you sure to delete this post?" onConfirm={onDeletePost} />
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className="post-content">
                <div className="post-body" dangerouslySetInnerHTML={{ __html: processPostContent(postContent) }}></div>
            </div>
            <div className="post-images">
                {props.post.attachments && props.post.attachments.map((attachment, index) => {
                    return (<>
                        {attachment.resource_type && attachment.resource_type == "post_attachment_video" ? (
                            <div className="video-container">
                                <video className="video" controls muted playsInline>
                                    <source src={attachment.url} type={"video/" + attachment.url.substring(attachment.url.lastIndexOf('.') + 1)} />
                                    Sorry, your browser doesn't support videos.
                                </video>
                            </div>
                        ) : (
                            <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                                <img className="post-image" src={attachment.url || ""} alt="" />
                            </a>
                        )}

                    </>);
                })}
            </div>
            <div className="post-actions">

                {/* Like Section */}
                <CookiesProvider>
                    <div className={"post-action post-likes" + (likeActive ? ' active' : '')} onClick={() => doToggleLike(props.post.id)}>
                        {likeActive ? (
                            <IoThumbsUp />
                        ) : (
                            <IoThumbsUpOutline />

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

                {/* Laugh Section */}
                <CookiesProvider>
                    <div className={"post-action post-likes" + (laughActive ? ' active' : '')}>
                        <FaFaceLaughBeam onClick={() => doToggleLaugh(props.post.id)} />
                        <NumUnit number={laughsCount} onClick={(e) => onShowLaughedBy(e)} />

                        <div className={"post-liked-by-dropdown" + (getShowLaughedBy() ? ' d-show' : ' d-none')}>
                            {laughByData && laughByData.slice(0, Math.min(showMaxLaughedBy, laughByData.length)).map((laugh, index) => (
                                <div key={"laughed-by-post-" + props.post.id + "-" + laugh.id} className="liked-by">
                                    <img src={laugh.profile_picture || defaultAvatar} alt="" />
                                </div>
                            ))}
                            <div className="total-likes">
                                {laughsCount > showMaxLaughedBy ? '+' : ''}{laughsCount > 0 ? (laughsCount > showMaxLaughedBy ? laughsCount - showMaxLaughedBy : laughsCount) : 0} laugh{laughsCount > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                </CookiesProvider>


                {/* Love Section */}
                <CookiesProvider>
                    <div className={"post-action post-likes" + (loveActive ? ' active' : '')}>
                        {loveActive ? (
                            <IoHeart onClick={() => doToggleLove(props.post.id)} />
                        ) : (
                            <IoHeartOutline onClick={() => doToggleLove(props.post.id)} />

                        )}
                        <NumUnit number={lovesCount} onClick={(e) => onShowLovedBy(e)} />

                        <div className={"post-liked-by-dropdown" + (getShowLovedBy() ? ' d-show' : ' d-none')}>
                            {loveByData && loveByData.slice(0, Math.min(showMaxLovedBy, loveByData.length)).map((love, index) => (
                                <div key={"loveed-by-post-" + props.post.id + "-" + love.id} className="liked-by">
                                    <img src={love.profile_picture || defaultAvatar} alt="" />
                                </div>
                            ))}
                            <div className="total-likes">
                                {lovesCount > showMaxLovedBy ? '+' : ''}{lovesCount > 0 ? (lovesCount > showMaxLovedBy ? lovesCount - showMaxLovedBy : lovesCount) : 0} love{lovesCount > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </CookiesProvider>

                <div className="post-action post-comments" onClick={() => toggleShowComments()}>
                    <IoChatbubbleEllipsesOutline />
                    <NumUnit number={commentsCount} />
                </div>

            </div>
            <div key={'comment-box-' + props.post.id} post={props.post} className={"comment-box d-" + (showComments ? 'show' : 'none')}>
                <Divider />
                <div className="comment-input">
                    <CreateComment post={props.post} />
                </div>
                <h5 className="title-small">Comments</h5>
                <div className="comments">
                    {commentsData && commentsData.length ? commentsData.map((comment, index) => {
                        return (
                            <Comment key={"comment-post-" + props.post.id + "-" + comment.id} post={props.post} comment={comment} />
                        );
                    }) : (
                        <></>
                    )}
                    {!viewAllCommentsClicked ? (
                        <>
                            < Divider />
                            <div className="all-comments-button">
                                <span className="btn btn-dark" onClick={() => viewAllComments()}>View all comments</span>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div >
    );
};

export default PostItem;