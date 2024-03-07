import {
    IoEllipsisVertical,
    IoTimeOutline,
} from "react-icons/io5";
import LoungePostIconCommentBlack from "../../assets/images/lounge-post-icon-comment-black.png";
import LoungePostIconCommentGold from "../../assets/images/lounge-post-icon-comment-gold.png";

import { useState, useRef } from "react";
import Divider from "../Divider";

import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import TimeAgo from "../TimeAgo";
import NumUnit from "../NumUnit";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import EditPost from "./EditPost";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import useHelper from "../../hooks/useHelper";

import { CookiesProvider, useCookies } from "react-cookie";
import { Link } from "@mui/material";
import PostReaction from "./PostReaction";
import PostLikes from "./PostLikes";
import PostLaughs from "./PostLaughs";
import PostLoves from "./PostLoves";

const useRefDimensions = (ref) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
    useEffect(() => {
        window.setInterval(function () {
            if (ref.current) {
                const { current } = ref
                const boundingRect = current.getBoundingClientRect()
                const { width, height } = boundingRect
                setDimensions({ width: Math.round(width), height: Math.round(height) })
            }
        }, [1000]);
    }, [ref])
    return dimensions
}

const PostItem = (props) => {

    const postContentRef = useRef(null);
    const dimensions = useRefDimensions(postContentRef);
    const [displayShowMore, setDisplayShowMore] = useState(false);
    const [showMoreClicked, setShowMoreClicked] = useState(false);

    useEffect(() => {
        if (dimensions && postContent?.length > 500 && !showMoreClicked) {
            setDisplayShowMore(true);
        }
    }, [dimensions]);

    const { injectHyperlinks } = useHelper();

    const showLaughedByCookieKey = "post-showLaughedBy-" + props.post.id;

    const showMaxLovedBy = 5;
    const showLovedByCookieKey = "post-showLovedBy-" + props.post.id;
    const [cookies, setCookie] = useCookies([showLovedByCookieKey]);

    const setShowLovedBy = (value) => {
        setCookie(showLovedByCookieKey, value, { path: "/" });
    };

    const getShowLovedBy = () => {
        return cookies ? cookies[showLovedByCookieKey] : false;
    };

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        state: { posts, post_reactions, reaction_action, post_likes, like_action, post_laughs, laugh_action, post_loves, love_action, post_updated, post_comments, comment_added, comment_updated, comment_deleted },
        getPosts, getReactions, getReaction, toggleReaction, getLikes, toggleLike, getLaugh, toggleLaugh, getLove, toggleLove, deletePost, getComments
    } = useContext(CommunityContext);

    const [defaultAvatar, setDefaultAvatar] = useState("https://adagencycreatives.noorsofttechdev.com/static/media/placeholder.12b7e9aaed5e5566bc6a.png");

    const [postContent, setPostContent] = useState("");
    const [actions, setActions] = useState("none");
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

    const doToggleLove = (post_id) => {
        // console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLove({ "post_id": post_id, type: "heart" })
    }

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

    const processPostContent = (plainText) => {
        return injectHyperlinks(plainText);
    };

    useEffect(() => {
        if (post_updated && post_updated.id == props.post.id) {
            setPostContent(processPostContent(post_updated.content));
        }
    }, [post_updated]);

    useEffect(() => {
        setPostContent(processPostContent(props.post.content));
    }, []);

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

    return (
        <div key={'div-post-item-' + props.post.id} className="post-item">
            <div className="post-header">
                <img className="post-avatar" src={props.post.author_avatar || defaultAvatar} alt="" />
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
                                <EditPost key={'edit-' + props.post.id} post={props.post} onUpdatePost={onUpdatePost} />
                                <ConfirmDeleteModal key={'delete-' + props.post.id} title="Confirm Delete Post?" message="Are you sure to delete this post?" onConfirm={onDeletePost} />
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className={"post-content" + (!showMoreClicked && postContent?.length > 500 ? " post-preview" : "")} ref={postContentRef}>
                <div className="post-body" dangerouslySetInnerHTML={{ __html: postContent }}></div>
            </div>
            {postContent?.length > 500 && (
                <div className="show-more-container">
                    <Link className="show-more" onClick={(e) => {
                        setShowMoreClicked(value => !value);
                    }}>... Show {showMoreClicked ? "Less" : "More"}</Link>
                </div>
            )}
            {/* <div className="post-content">
                <ShowMoreText
                    // Default options
                    lines={3}
                    more="... Show more"
                    less="... Show less"
                    className=""
                    anchorClass="show-more-less-clickable"
                    // onClick={this.executeOnClick}
                    expanded={false}
                    // width={280}
                    truncatedEndingComponent={""}
                >
                    <div className="post-body" dangerouslySetInnerHTML={{ __html: postContent }}></div>
                </ShowMoreText>
            </div> */}
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

                <PostReaction
                    post={props?.post}
                    user={user}
                    post_reactions={post_reactions}
                    reaction_action={reaction_action}
                    getReactions={getReactions}
                    getReaction={getReaction}
                    toggleReaction={toggleReaction}
                />

                {/* <PostLikes
                    post={props?.post}
                    user={user}
                    post_likes={post_likes}
                    like_action={like_action}
                    getLikes={getLikes}
                    toggleLike={toggleLike}
                />

                <PostLaughs
                    post={props?.post}
                    user={user}
                    post_laughs={post_laughs}
                    laugh_action={laugh_action}
                    getLaugh={getLaugh}
                    toggleLaugh={toggleLaugh}
                />


                <PostLoves
                    post={props?.post}
                    user={user}
                    post_loves={post_loves}
                    love_action={love_action}
                    getLove={getLove}
                    toggleLove={toggleLove}
                /> */}

                <div className="post-action post-comments" onClick={() => toggleShowComments()}>
                    {showComments ? (
                        <img src={LoungePostIconCommentGold} style={{ width: "20px" }} alt="" />
                    ) : (
                        <img src={LoungePostIconCommentBlack} style={{ width: "20px" }} alt="" />
                    )}
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