import Placeholder from "../../assets/images/placeholder.png";
import LoungePostIconLikeBlack from "../../assets/images/lounge-post-icon-like-black.png";
import LoungePostIconLikeGold from "../../assets/images/lounge-post-icon-like-gold.png";
import LoungePostIconLaughBlack from "../../assets/images/lounge-post-icon-laugh-black.png";
import LoungePostIconLaughGold from "../../assets/images/lounge-post-icon-laugh-gold.png";
import LoungePostIconLoveBlack from "../../assets/images/lounge-post-icon-love-black.png";
import LoungePostIconLoveGold from "../../assets/images/lounge-post-icon-love-gold.png";
import LoungePostIconSmileyLike from "../../assets/images/smiley-like.png";
import LoungePostIconSmileyLaugh from "../../assets/images/smiley-laugh.png";
import LoungePostIconSmileyLove from "../../assets/images/smiley-heart.png";

import NumUnit from "../NumUnit";
import { useContext, useEffect, useRef, useState } from "react";
import useLongPress from "../../hooks/useLongPress";

const PostReaction = ({ post, user, post_reactions, reaction_action, getReactions, toggleReaction }) => {

    const showMaxReactionBy = 5;
    const reactionKey = "post-reactions-" + post.id;
    const reactionActionKey = "post-reactions-action-" + post.id;

    const [reactionsCount, setReactionsCount] = useState(0);
    const [userReaction, setUserReaction] = useState([]);
    const [reactionActive, setReactionActive] = useState(false);
    const [reactionByData, setReactionByData] = useState([]);
    const [postReactionStats, setPostReactionStats] = useState([]);

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
            getReactions({ "post_id": post.id });
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
                    getReactions({ "post_id": post.id });
                    break;
                case "reaction_failed": console.log('Reaction Failed for Post ID: ' + reaction_action.post_id + ", Error: " + reaction_action.error); break;
                default:
                    console.log('Invalid Reaction Action for Post ID: ' + reaction_action.post_id);
            }
        }
    }, [reaction_action]);

    useEffect(() => {
        setReactionsCount(post.reactions_count);
        getReactions({ "post_id": post.id });
    }, [post.reactions_count]);

    useEffect(() => {
        if (reactionByData?.length > 0) {
            setPostReactionStats(getPostReactionStats());
        }
    }, [reactionByData]);

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

    const getPostReactionStats = () => {
        let postReactionStats = [];
        let postReactionsUnique = [];
        let reactionTypes = [];

        for (let index = 0; index < reactionByData?.length; index++) {
            const element = reactionByData[index];
            if (!reactionTypes.includes(element.reaction_type)) {
                reactionTypes.push(element.reaction_type);
                if (element.reaction_type == 'like') {
                    postReactionsUnique[element.reaction_type] = {
                        'type': element.reaction_type,
                        'icon': LoungePostIconSmileyLike,
                        'count': 0,
                        'reactions': []
                    };
                } else if (element.reaction_type == 'laugh') {
                    postReactionsUnique[element.reaction_type] = {
                        'type': element.reaction_type,
                        'icon': LoungePostIconSmileyLaugh,
                        'count': 0,
                        'reactions': []
                    };
                } else if (element.reaction_type == 'heart') {
                    postReactionsUnique[element.reaction_type] = {
                        'type': element.reaction_type,
                        'icon': LoungePostIconSmileyLove,
                        'count': 0,
                        'reactions': []
                    };
                }
            }
        }

        for (let index = 0; index < reactionByData?.length; index++) {
            const element = reactionByData[index];
            postReactionsUnique[element.reaction_type]['count'] += 1;
            postReactionsUnique[element.reaction_type]['reactions'].push(element);
        }

        for (let index = 0; index < reactionTypes?.length; index++) {
            const element = reactionTypes[index];
            postReactionStats.push(postReactionsUnique[element]);
        }

        return postReactionStats;
    };

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
            getReactions({ "post_id": post.id });
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

    const getReactionIcon = (icon = LoungePostIconSmileyLike) => {
        let reactionIcon = icon;
        let userReactionType = userReaction?.length > 0 ? userReaction[0]?.reaction_type : "";

        switch (userReactionType) {
            case "like": reactionIcon = LoungePostIconSmileyLike; break;
            case "laugh": reactionIcon = LoungePostIconSmileyLaugh; break;
            case "heart": reactionIcon = LoungePostIconSmileyLove; break;
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

    const showReactionsBy = (e, item, index) => {
        let elems = document.getElementsByClassName('reaction-by-list');
        if (elems?.length > 0) {
            for (let index = 0; index < elems.length; index++) {
                const el = elems[index];
                el.classList.remove('d-flex');
                el.classList.add('d-none');
            }
        }
        let target = document.getElementById('reaction-by-list-post-reactions-stats-item-' + index + '-' + reactionKey);
        target.classList.remove('d-none');
        target.classList.add('d-flex');
    };

    const resetPostReactionStatsReactionsBy = (e) => {
        console.log("leave");
        let elems = document.getElementsByClassName('reaction-by-list');
        if (elems?.length > 0) {
            for (let index = 0; index < elems.length; index++) {
                const el = elems[index];
                el.classList.remove('d-flex');
                el.classList.add('d-none');
            }
        }
    };

    return (
        <>
            <div className={"post-action post-reactions" + (reactionActive ? ' active' : '')}>
                <img src={getReactionIcon()} style={{ width: "20px" }} alt="" {...longPressEvent} onMouseOver={(e) => {
                    onShowReactionAction(e);
                    window.setTimeout(() => {
                        document.currentPostReactionActionKey = null;
                    }, 200);
                }} />

                {reactionsCount > 0 && (
                    <NumUnit default={""} number={reactionsCount}
                    // onMouseDown={(e) => onShowReactionBy(e)} 
                    // onClick={(e) => {
                    //     document.currentPostReactionKey = null;
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //     return false;
                    // }} 
                    />
                )}
                <div id={reactionActionKey} className={"post-reaction-action-dropdown d-none"}>
                    <div className={"image-container" + (getUserReactionType() == 'like' ? " active" : "")} onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'like' ? '' : 'like')}>
                        <img src={LoungePostIconSmileyLike} style={{ width: "30px", height: "30px" }} alt="" />
                    </div>
                    <div className={"image-container" + (getUserReactionType() == 'laugh' ? " active" : "")} onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'laugh' ? '' : 'laugh')}>
                        <img src={LoungePostIconSmileyLaugh} style={{ width: "30px", height: "30px" }} alt="" />
                    </div>
                    <div className={"image-container" + (getUserReactionType() == 'heart' ? " active" : "")} onMouseDown={(e) => doToggleReaction(post.id, getUserReactionType() == 'heart' ? '' : 'heart')}>
                        <img src={LoungePostIconSmileyLove} style={{ width: "30px", height: "30px" }} alt="" />
                    </div>
                </div>
            </div>
            {postReactionStats?.length > 0 && (<>
                <div id={reactionKey} className={"post-reaction-dropdown"} onMouseLeave={(e) => resetPostReactionStatsReactionsBy()}>
                    {/* {reactionByData && reactionByData.slice(0, Math.min(showMaxReactionBy, reactionByData.length)).map((reaction, index) => {

                        return (
                            <div key={"reaction-by-post-" + post.id + "-" + reaction.id} className="reaction-by">
                                <img src={reaction.profile_picture || Placeholder} alt="" />
                            </div>
                        );

                    })}
                    <div className="reactions-total">
                        {reactionsCount > showMaxReactionBy ? '+' : ''}{reactionsCount > 0 ? (reactionsCount > showMaxReactionBy ? reactionsCount - showMaxReactionBy : reactionsCount) : 0} reaction{reactionsCount > 1 ? 's' : ''}
                    </div> */}
                    <div className="post-reactions-stats-container"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }}
                    >
                        {postReactionStats.map((item, index) => {
                            return (
                                <div key={'reaction-by-list-post-reactions-stats-item-' + index + '-' + reactionKey} className="post-reactions-stats-item">
                                    <img src={item['icon']} alt=""
                                        onMouseOver={(e) => showReactionsBy(e, item, index)}
                                        onClick={(e) => showReactionsBy(e, item, index)}
                                    />
                                    <span className="num-unit reactions-stats-count">{item['reactions']?.length || 0}</span>
                                    <div id={'reaction-by-list-post-reactions-stats-item-' + index + '-' + reactionKey} className="reaction-by-list d-none">
                                        {item['reactions']?.length > 0 && item['reactions'].map((reaction) => {
                                            return (
                                                <a className="avatar-link" href={"/creative/" + reaction?.username} target="__blank">
                                                    <img src={reaction?.user_thumbnail || reaction.profile_picture} alt="" />
                                                    <span>{reaction.user}</span>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                        <span>
                            {reactionActive && postReactionStats?.length > 1 ? 'You and others' : ''}
                            {reactionActive && postReactionStats?.length == 1 ? 'You' : ''}
                            {!reactionActive && postReactionStats?.length > 0 ? 'Others' : ''}
                        </span>
                    </div>

                </div>
            </>)}
        </>
    );
};

export default PostReaction;