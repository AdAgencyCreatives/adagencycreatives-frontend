import { useState, useEffect } from "react";
import CommunityMemberWidget from "../../components/community/CommunityMemberWidget";
import { getCreativeById } from "../../context/FriendsDataContext";

const MyFriendWidget = (props) => {

    const [creative, setCreative] = useState(null);

    const getCreativeByIdAsync = async () => {
        let result = await getCreativeById(props.my_friend.user.uuid);
        setCreative(result);
    };

    useEffect(() => {
        getCreativeByIdAsync();
    }, []);

    return (
        <>
            {creative ? (
                <CommunityMemberWidget key={"community-member-creative-" + creative.id} creative={creative} />
            ) : (
                <></>
            )}
        </>

    );
};

export default MyFriendWidget;