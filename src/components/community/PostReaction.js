import Placeholder from "../../assets/images/placeholder.png";
import LoungePostIconLikeBlack from "../../assets/images/lounge-post-icon-like-black.png";
import LoungePostIconLikeGold from "../../assets/images/lounge-post-icon-like-gold.png";
import LoungePostIconLaughBlack from "../../assets/images/lounge-post-icon-laugh-black.png";
import LoungePostIconLaughGold from "../../assets/images/lounge-post-icon-laugh-gold.png";
import LoungePostIconLoveBlack from "../../assets/images/lounge-post-icon-love-black.png";
import LoungePostIconLoveGold from "../../assets/images/lounge-post-icon-love-gold.png";

import NumUnit from "../NumUnit";
import { useEffect, useRef, useState } from "react";
import useLongPress from "../../hooks/useLongPress";

const PostReaction = ({ post, user, post_reactions, reaction_action, getReactions, toggleReaction }) => {

    const showMaxReactionBy = 5;
    const reactionKey = "post-reactions-" + post.id;
    const reactionActionKey = "post-reactions-action-" + post.id;

    const [reactionsCount, setReactionsCount] = useState(0);
    const [userReaction, setUserReaction] = useState([]);
    const [reactionActive, setReactionActive] = useState(false);
    const [reactionByData, setReactionByData] = useState([]);

    const setSingleRections = (data) => {
        if (!data?.length) {
            setReactionByData(null);
            return;
        }

        let uniqueUserReactionData = [];
        let uniqueUsers = [];

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (!uniqueUsers.includes(element.user_id)) {
                uniqueUsers.push(element.user_id);
                uniqueUserReactionData.push(element);
            }
        }

        setReactionByData(uniqueUserReactionData)
        if (uniqueUserReactionData?.length != reactionsCount) {
            setReactionsCount(uniqueUserReactionData.length);
        }
    };

    useEffect(() => {
        if (post_reactions && post_reactions.data && post_reactions.data.data) {
            if (post_reactions?.post_id != post.id) {
                return;
            }

            setSingleRections(post_reactions.data.data)
            let user_reaction = post_reactions.data.data.filter(item => item.user_id == user.uuid);
            setReactionActive(user_reaction && user_reaction.length);
            setUserReaction(user_reaction);
        } else {
            setReactionsCount(post.reactions_count);
            getReactions({ "post_id": post.id, "single": "yes" });
        }
    }, [post_reactions]);


    useEffect(() => {
        if (reaction_action && reaction_action.action) {
            if (post.id != reaction_action.post_id) {
                return;
            }
            switch (reaction_action.action) {
                case "reaction_begin": console.log('Reaction Begin for Post ID: ' + reaction_action.post_id); break;
                case "reaction_success":
                    console.log('Reaction Succeed for Post ID: ' + reaction_action.post_id);
                    setReactionsCount(reactionsCount + (!reactionActive ? 1 : -1));
                    setReactionActive(!reactionActive);
                    getReactions({ "post_id": post.id, "single": "yes" });
                    break;
                case "reaction_failed": console.log('Reaction Failed for Post ID: ' + reaction_action.post_id + ", Error: " + reaction_action.error); break;
                default:
                    console.log('Invalid Reaction Action for Post ID: ' + reaction_action.post_id);
            }
        }
    }, [reaction_action]);

    useEffect(() => {
        setReactionsCount(post.reactions_count);
        getReactions({ "post_id": post.id, "single": "yes" });
    }, [post.reactions_count]);

    const doToggleReaction = (post_id, type) => {
        let user_reaction_type = getUserReactionType();

        // console.log('Initiated Post Reaction for Post ID: ' + post_id);
        if (user_reaction_type?.length > 0) {
            toggleReaction({ "post_id": post_id, "type": user_reaction_type });
        }

        if (type?.length) {
            toggleReaction({ "post_id": post_id, "type": type });
        }
    }

    const getShowReactionBy = () => {
        const element = document.getElementById(reactionKey);
        return element?.classList?.contains('d-show') ? true : false;
    };

    const getShowReactionAction = () => {
        const element = document.getElementById(reactionActionKey);
        return element?.classList?.contains('d-show') ? true : false;
    };

    const setShowReactionBy = (state) => {
        const element = document.getElementById(reactionKey);
        if (element) {
            element?.classList?.remove(state ? 'd-none' : 'd-show');
            element?.classList?.add(state ? 'd-show' : 'd-none');
        }
    };

    const setShowReactionAction = (state) => {
        const element = document.getElementById(reactionActionKey);
        if (element) {
            element?.classList?.remove(state ? 'd-none' : 'd-show');
            element?.classList?.add(state ? 'd-show' : 'd-none');
        }
    };

    const onShowReactionBy = (e) => {
        document.currentPostReactionKey = reactionKey;
        let newState = !getShowReactionBy();
        setShowReactionBy(newState);
        if (newState) {
            getReactions({ "post_id": post.id, "single": "yes" });
        }
    };

    const onShowReactionAction = (e) => {
        document.currentPostReactionActionKey = reactionActionKey;
        let newState = !getShowReactionAction();
        setShowReactionAction(newState);
        if (newState) {
            // do something
        }
    };

    const getReactionIcon = (icon = LoungePostIconLikeBlack) => {
        let reactionIcon = icon;
        let userReactionType = userReaction?.length > 0 ? userReaction[0]?.reaction_type : "";

        switch (userReactionType) {
            case "like": reactionIcon = LoungePostIconLikeGold; break;
            case "laugh": reactionIcon = LoungePostIconLaughGold; break;
            case "heart": reactionIcon = LoungePostIconLoveGold; break;
            default: reactionIcon = icon;
        }

        return reactionIcon;
    };

    const getUserReactionType = () => {
        return userReaction?.length > 0 ? userReaction[0]?.reaction_type : "";
    };

    const onLongPress = (e) => {
        console.log('longpress is triggered');
        onShowReactionAction(e);
        window.setTimeout(() => {
            document.currentPostReactionActionKey = null;
        }, 200);
    };

    const onClick = (e) => {
        doToggleReaction(post.id, getUserReactionType()?.length > 0 ? '' : 'like');
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <>
            <div className={"post-action post-reactions" + (reactionActive ? ' active' : '')}>
                <img src={getReactionIcon()} style={{ width: "20px" }} alt="" {...longPressEvent} onMouseOver={(e) => {
                    onShowReactionAction(e);
                    window.setTimeout(() => {
                        document.currentPostReactionActionKey = null;
                    }, 200);
                }} />
                <NumUnit number={reactionsCount} onMouseDown={(e) => onShowReactionBy(e)} onClick={(e) => {
                    document.currentPostReactionKey = null;
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }} />
                <div id={reactionActionKey} className={"post-reaction-action-dropdown d-none"}>
                    <div className="image-container" onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'like' ? '' : 'like')}>
                        <img src={getUserReactionType() == 'like' ? LoungePostIconLikeGold : LoungePostIconLikeBlack} style={{ width: "20px" }} alt="" />
                    </div>
                    <div className="image-container" onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'laugh' ? '' : 'laugh')}>
                        <img src={getUserReactionType() == 'laugh' ? LoungePostIconLaughGold : LoungePostIconLaughBlack} style={{ width: "20px" }} alt="" />
                    </div>
                    <div className="image-container" onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'heart' ? '' : 'heart')}>
                        <img src={getUserReactionType() == 'heart' ? LoungePostIconLoveGold : LoungePostIconLoveBlack} style={{ width: "20px" }} alt="" />
                    </div>
                </div>
                <div id={reactionKey} className={"post-reaction-dropdown d-none"}>
                    {reactionByData && reactionByData.slice(0, Math.min(showMaxReactionBy, reactionByData.length)).map((reaction, index) => (
                        <div key={"reaction-by-post-" + post.id + "-" + reaction.id} className="reaction-by">
                            <img src={reaction.profile_picture || Placeholder} alt="" />
                        </div>
                    ))}
                    <div className="reactions-total">
                        {reactionsCount > showMaxReactionBy ? '+' : ''}{reactionsCount > 0 ? (reactionsCount > showMaxReactionBy ? reactionsCount - showMaxReactionBy : reactionsCount) : 0} reaction{reactionsCount > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostReaction;