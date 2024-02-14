import Placeholder from "../../assets/images/placeholder.png";
import LoungePostIconLikeBlack from "../../assets/images/lounge-post-icon-like-black.png";
import LoungePostIconLikeGold from "../../assets/images/lounge-post-icon-like-gold.png";

import NumUnit from "../NumUnit";
import { useEffect, useRef, useState } from "react";

const PostLikes = ({ post, user, post_likes, like_action, getLikes, toggleLike }) => {

    const showMaxLikedBy = 5;
    const reactionKey = "post-likes-" + post.id;

    const [likesCount, setLikesCount] = useState(0);
    const [likeActive, setLikeActive] = useState(false);
    const [likedByData, setLikedByData] = useState([]);

    useEffect(() => {
        if (post_likes && post_likes.data && post_likes.data.data) {
            if (post_likes.post_id && post_likes.post_id != post.id) {
                return;
            }
            if (post_likes.data.data.length != likesCount) {
                setLikesCount(post_likes.data.data.length);
            }
            setLikedByData(post_likes.data.data)
            let user_liked = post_likes.data.data.filter(item => item.user_id == user.uuid);
            setLikeActive(user_liked && user_liked.length);
        } else {
            setLikesCount(post.likes_count);
            getLikes({ "post_id": post.id });
        }
    }, [post_likes]);


    useEffect(() => {
        if (like_action && like_action.action) {
            if (post.id != like_action.post_id) {
                return;
            }
            switch (like_action.action) {
                case "like_begin": console.log('Like Begin for Post ID: ' + like_action.post_id); break;
                case "like_success":
                    console.log('Like Succeed for Post ID: ' + like_action.post_id);
                    setLikesCount(likesCount + (!likeActive ? 1 : -1));
                    setLikeActive(!likeActive);
                    getLikes({ "post_id": post.id });
                    break;
                case "like_failed": console.log('Like Failed for Post ID: ' + like_action.post_id + ", Error: " + like_action.error); break;
                default:
                    console.log('Invalid Like Action for Post ID: ' + like_action.post_id);
            }
        }
    }, [like_action]);

    useEffect(() => {
        setLikesCount(post.likes_count);
        getLikes({ "post_id": post.id });
    }, [post.likes_count]);

    const doToggleLike = (post_id) => {
        // console.log('Initiated Post Like for Post ID: ' + post_id);
        toggleLike({ "post_id": post_id })
    }

    const getShowLikedBy = () => {
        const element = document.getElementById(reactionKey);
        return element?.classList?.contains('d-show') ? true : false;
    };

    const setShowLikedBy = (state) => {
        const element = document.getElementById(reactionKey);
        if (element) {
            element?.classList?.remove(state ? 'd-none' : 'd-show');
            element?.classList?.add(state ? 'd-show' : 'd-none');
        }
    };

    const onShowLikedBy = (e) => {
        document.currentPostReactionKey = reactionKey;
        let newState = !getShowLikedBy();
        setShowLikedBy(newState);
        if (newState) {
            getLikes({ "post_id": post.id });
        }
    };

    return (
        <>
            <div className={"post-action post-likes" + (likeActive ? ' active' : '')} onClick={() => doToggleLike(post.id)}>
                {likeActive ? (
                    <img src={LoungePostIconLikeGold} style={{ width: "20px" }} alt="" />
                ) : (
                    <img src={LoungePostIconLikeBlack} style={{ width: "20px" }} alt="" />
                )}
                <NumUnit number={likesCount} onMouseDown={(e) => onShowLikedBy(e)} onClick={(e) => {
                    document.currentPostReactionKey = null;
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }} />
                <div id={reactionKey} className={"post-reaction-dropdown d-none"}>
                    {likedByData && likedByData.slice(0, Math.min(showMaxLikedBy, likedByData.length)).map((like, index) => (
                        <div key={"reaction-by-post-" + post.id + "-" + like.id} className="reaction-by">
                            <img src={like.profile_picture || Placeholder} alt="" />
                        </div>
                    ))}
                    <div className="reactions-total">
                        {likesCount > showMaxLikedBy ? '+' : ''}{likesCount > 0 ? (likesCount > showMaxLikedBy ? likesCount - showMaxLikedBy : likesCount) : 0} like{likesCount > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostLikes;