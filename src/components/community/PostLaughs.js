import Placeholder from "../../assets/images/placeholder.png";
import LoungePostIconLaughBlack from "../../assets/images/lounge-post-icon-laugh-black.png";
import LoungePostIconLaughGold from "../../assets/images/lounge-post-icon-laugh-gold.png";

import NumUnit from "../NumUnit";
import { useEffect, useRef, useState } from "react";

const PostLaughs = ({ post, user, post_laughs, laugh_action, getLaugh, toggleLaugh }) => {

    const showMaxLaughedBy = 5;
    const reactionKey = "post-laughs-" + post.id;

    const [laughsCount, setLaughsCount] = useState(0);
    const [laughActive, setLaughActive] = useState(false);
    const [laughedByData, setLaughedByData] = useState([]);

    useEffect(() => {
        if (post_laughs && post_laughs.data && post_laughs.data.data) {
            if (post_laughs.post_id && post_laughs.post_id != post.id) {
                return;
            }
            if (post_laughs.data.data.length != laughsCount) {
                setLaughsCount(post_laughs.data.data.length);
            }
            setLaughedByData(post_laughs.data.data)
            let user_laughed = post_laughs.data.data.filter(item => item.user_id == user.uuid);
            setLaughActive(user_laughed && user_laughed.length);
        } else {
            setLaughsCount(post.laughs_count);
            getLaugh({ "post_id": post.id });
        }
    }, [post_laughs]);


    useEffect(() => {
        if (laugh_action && laugh_action.action) {
            if (post.id != laugh_action.post_id) {
                return;
            }
            switch (laugh_action.action) {
                case "laugh_begin": console.log('Laugh Begin for Post ID: ' + laugh_action.post_id); break;
                case "laugh_success":
                    console.log('Laugh Succeed for Post ID: ' + laugh_action.post_id);
                    setLaughsCount(laughsCount + (!laughActive ? 1 : -1));
                    setLaughActive(!laughActive);
                    getLaugh({ "post_id": post.id });
                    break;
                case "laugh_failed": console.log('Laugh Failed for Post ID: ' + laugh_action.post_id + ", Error: " + laugh_action.error); break;
                default:
                    console.log('Invalid Laugh Action for Post ID: ' + laugh_action.post_id);
            }
        }
    }, [laugh_action]);

    useEffect(() => {
        setLaughsCount(post.laughs_count);
        getLaugh({ "post_id": post.id });
    }, [post.laughs_count]);

    const doToggleLaugh = (post_id) => {
        // console.log('Initiated Post Laugh for Post ID: ' + post_id);
        toggleLaugh({ "post_id": post_id })
    }

    const getShowLaughedBy = () => {
        const element = document.getElementById(reactionKey);
        return element?.classList?.contains('d-show') ? true : false;
    };

    const setShowLaughedBy = (state) => {
        const element = document.getElementById(reactionKey);
        if (element) {
            element?.classList?.remove(state ? 'd-none' : 'd-show');
            element?.classList?.add(state ? 'd-show' : 'd-none');
        }
    };

    const onShowLaughedBy = (e) => {
        document.currentPostReactionKey = reactionKey;
        let newState = !getShowLaughedBy();
        setShowLaughedBy(newState);
        if (newState) {
            getLaugh({ "post_id": post.id });
        }
    };

    return (
        <>
            <div className={"post-action post-laughs" + (laughActive ? ' active' : '')} onClick={() => doToggleLaugh(post.id)}>
                {laughActive ? (
                    <img src={LoungePostIconLaughGold} style={{ width: "20px" }} alt="" />
                ) : (
                    <img src={LoungePostIconLaughBlack} style={{ width: "20px" }} alt="" />
                )}
                <NumUnit number={laughsCount} onMouseDown={(e) => onShowLaughedBy(e)} onClick={(e) => {
                    document.currentPostReactionKey = null;
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }} />
                <div id={reactionKey} className={"post-reaction-dropdown" + (getShowLaughedBy() ? ' d-show' : ' d-none')}>
                    {laughedByData && laughedByData.slice(0, Math.min(showMaxLaughedBy, laughedByData.length)).map((laugh, index) => (
                        <div key={"laughed-by-post-" + post.id + "-" + laugh.id} className="reaction-by">
                            <img src={laugh.profile_picture || Placeholder} alt="" />
                        </div>
                    ))}
                    <div className="reactions-total">
                        {laughsCount > showMaxLaughedBy ? '+' : ''}{laughsCount > 0 ? (laughsCount > showMaxLaughedBy ? laughsCount - showMaxLaughedBy : laughsCount) : 0} laugh{laughsCount > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostLaughs;