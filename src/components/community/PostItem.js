import {
    IoEllipsisVertical,
    IoTimeOutline,
} from "react-icons/io5";
import Placeholder from "../../assets/images/placeholder.png";

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

import { Link } from "@mui/material";
import PostReaction from "./PostReaction";
import ImageDialog from "../ImageDialog";

import ImageSlider from "./Modals/ImageSlider";

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

    let imageAttachmentIndex = 0;
    const postContentRef = useRef(null);
    const dimensions = useRefDimensions(postContentRef);
    const [displayShowMore, setDisplayShowMore] = useState(false);
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageDialogImage, setImageDialogImage] = useState("");

    const [imageSliderOpen, setImageSliderOpen] = useState(false);
    const [imageSliderIndex, setImageSliderIndex] = useState(0);

    useEffect(() => {
        if (postContent?.length > 0 && postContent.indexOf('class="welcome-lounge"') >= 0) {
            return;
        }
        if (dimensions && postContent?.length > 500 && !showMoreClicked) {
            setDisplayShowMore(true);
        }
    }, [dimensions]);

    const { injectHyperlinks } = useHelper();

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        state: { post_reactions, reaction_action, post_updated, post_comments, comment_added, comment_updated, comment_deleted },
        getReactions, getReaction, toggleReaction, deletePost, getComments
    } = useContext(CommunityContext);

    const [postContent, setPostContent] = useState("");
    const [actions, setActions] = useState("none");
    const [commentsData, setCommentsData] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const [viewAllCommentsClicked, setViewAllCommentsClicked] = useState(false);

    const toggleShowComments = () => {
        let newState = !showComments;
        setShowComments(newState);
    };

    const viewAllComments = () => {
        getComments(props.post.id)
        setViewAllCommentsClicked(true);
    };

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
        imageAttachmentIndex = 0;
        setPostContent(processPostContent(props.post.content));
    }, []);

    const onUpdatePost = () => {
        setActions("none");
    };

    const onDeletePost = () => {
        setActions("none");
        deletePost(props.post.id);
    };

    const getImageAttachments = () => {
        let attachments = [];
        let attachmentIndex = 0;
        if (props?.post?.attachments?.length > 0) {
            for (let index = 0; index < props.post.attachments.length; index++) {
                const element = props.post.attachments[index];
                if (element.resource_type == "post_attachment_image") {
                    attachments[attachmentIndex++] = element;
                }
            }
        }
        return attachments;
    };

    const getVideoAttachments = () => {
        let attachments = [];
        let attachmentIndex = 0;
        if (props?.post?.attachments?.length > 0) {
            for (let index = 0; index < props.post.attachments.length; index++) {
                const element = props.post.attachments[index];
                if (element.resource_type == "post_attachment_video") {
                    attachments[attachmentIndex++] = element;
                }
            }
        }
        return attachments;
    };

    return (
        <div key={'div-post-item-' + props.post.id} className="post-item">
            <div className="post-header">
                <img className="post-avatar" src={props.post?.user_thumbnail || props.post.author_avatar || Placeholder} alt="" />
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
                                <ConfirmDeleteModal title="Confirm Delete Post?" message="Are you sure to delete this post?" onConfirm={onDeletePost} />
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className={"post-content" + (!showMoreClicked && postContent?.length > 500 ? " post-preview" : "")} ref={postContentRef}>
                <div className="post-body" dangerouslySetInnerHTML={{ __html: postContent }}></div>
            </div>
            <ImageDialog image={imageDialogImage} setImage={setImageDialogImage} open={imageDialogOpen} setOpen={setImageDialogOpen} />
            {displayShowMore && (
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
                <ImageSlider open={imageSliderOpen} setOpen={setImageSliderOpen} postAttachments={props.post.attachments} selectedIndex={imageSliderIndex} />
                {getVideoAttachments()?.map((attachment, index) => {
                    return (
                        <div className="video-container">
                            <video className="video" controls muted playsInline>
                                <source src={attachment.url} type={"video/" + attachment.url.substring(attachment.url.lastIndexOf('.') + 1)} />
                                Sorry, your browser doesn't support videos.
                            </video>
                        </div>
                    );
                })}
                {getImageAttachments()?.map((attachment, index) => {
                    return (
                        <div>
                            <Link to={"javascript:void(0)"} onClick={(e) => {
                                // setImageDialogImage(attachment.url);
                                // setImageDialogOpen(true);
                                setImageSliderIndex(index);
                                setImageSliderOpen(true);
                            }}>
                                <img image-index={imageAttachmentIndex - 1} className={"post-image" + (imageAttachmentIndex == 1 ? " full-width" : "")} src={attachment.url || ""} alt="" />
                            </Link>
                        </div>
                    );
                })}
            </div >
            <div className="post-actions">

                <PostReaction
                    post={props?.post}
                    user={user}
                    post_reactions={post_reactions}
                    reaction_action={reaction_action}
                    getReactions={getReactions}
                    getReaction={getReaction}
                    toggleReaction={toggleReaction}
                    commentsCount={commentsCount}
                    toggleShowComments={toggleShowComments}
                    showComments={showComments}
                />

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