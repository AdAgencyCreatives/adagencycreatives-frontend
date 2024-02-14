import Placeholder from "../../assets/images/placeholder.png";
import LoungePostIconLoveBlack from "../../assets/images/lounge-post-icon-love-black.png";
import LoungePostIconLoveGold from "../../assets/images/lounge-post-icon-love-gold.png";

import NumUnit from "../NumUnit";
import { useEffect, useRef, useState } from "react";

const PostLoves = ({ post, user, post_loves, love_action, getLove, toggleLove }) => {

    const showMaxLovedBy = 5;
    const reactionKey = "post-loves-" + post.id;

    const [lovesCount, setLovesCount] = useState(0);
    const [loveActive, setLoveActive] = useState(false);
    const [lovedByData, setLovedByData] = useState([]);

    useEffect(() => {
        if (post_loves && post_loves.data && post_loves.data.data) {
            if (post_loves.post_id && post_loves.post_id != post.id) {
                return;
            }
            if (post_loves.data.data.length != lovesCount) {
                setLovesCount(post_loves.data.data.length);
            }
            setLovedByData(post_loves.data.data)
            let user_loved = post_loves.data.data.filter(item => item.user_id == user.uuid);
            setLoveActive(user_loved && user_loved.length);
        } else {
            setLovesCount(post.loves_count);
            getLove({ "post_id": post.id });
        }
    }, [post_loves]);


    useEffect(() => {
        if (love_action && love_action.action) {
            if (post.id != love_action.post_id) {
                return;
            }
            switch (love_action.action) {
                case "love_begin": console.log('Love Begin for Post ID: ' + love_action.post_id); break;
                case "love_success":
                    console.log('Love Succeed for Post ID: ' + love_action.post_id);
                    setLovesCount(lovesCount + (!loveActive ? 1 : -1));
                    setLoveActive(!loveActive);
                    getLove({ "post_id": post.id });
                    break;
                case "love_failed": console.log('Love Failed for Post ID: ' + love_action.post_id + ", Error: " + love_action.error); break;
                default:
                    console.log('Invalid Love Action for Post ID: ' + love_action.post_id);
            }
        }
    }, [love_action]);

    useEffect(() => {
        setLovesCount(post.loves_count);
        getLove({ "post_id": post.id });
    }, [post.loves_count]);

    const doToggleLove = (post_id) => {
        // console.log('Initiated Post Love for Post ID: ' + post_id);
        toggleLove({ "post_id": post_id })
    }

    const getShowLovedBy = () => {
        const element = document.getElementById(reactionKey);
        return element?.classList?.contains('d-show') ? true : false;
    };

    const setShowLovedBy = (state) => {
        const element = document.getElementById(reactionKey);
        if (element) {
            element?.classList?.remove(state ? 'd-none' : 'd-show');
            element?.classList?.add(state ? 'd-show' : 'd-none');
        }
    };

    const onShowLovedBy = (e) => {
        document.currentPostReactionKey = reactionKey;
        let newState = !getShowLovedBy();
        setShowLovedBy(newState);
        if (newState) {
            getLove({ "post_id": post.id });
        }
    };

    return (
        <>
            <div className={"post-action post-loves" + (loveActive ? ' active' : '')} onClick={() => doToggleLove(post.id)}>
                {loveActive ? (
                    <img src={LoungePostIconLoveGold} style={{ width: "20px" }} alt="" />
                ) : (
                    <img src={LoungePostIconLoveBlack} style={{ width: "20px" }} alt="" />
                )}
                <NumUnit number={lovesCount} onMouseDown={(e) => onShowLovedBy(e)} onClick={(e) => {
                    document.currentPostReactionKey = null;
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }} />
                <div id={reactionKey} className={"post-reaction-dropdown" + (getShowLovedBy() ? ' d-show' : ' d-none')}>
                    {lovedByData && lovedByData.slice(0, Math.min(showMaxLovedBy, lovedByData.length)).map((love, index) => (
                        <div key={"loved-by-post-" + post.id + "-" + love.id} className="reaction-by">
                            <img src={love.profile_picture || Placeholder} alt="" />
                        </div>
                    ))}
                    <div className="reactions-total">
                        {lovesCount > showMaxLovedBy ? '+' : ''}{lovesCount > 0 ? (lovesCount > showMaxLovedBy ? lovesCount - showMaxLovedBy : lovesCount) : 0} love{lovesCount > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostLoves;