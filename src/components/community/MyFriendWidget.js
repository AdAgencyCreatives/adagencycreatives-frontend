import { useState, useEffect } from "react";
import CommunityMemberWidget from "../../components/community/CommunityMemberWidget";
import { getCreativeById } from "../../context/FriendsDataContext";
import { CircularProgress } from "@mui/material";

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
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="sliderContent members-list">
                        <CircularProgress />
                    </div>
                </div >
            )}
        </>

    );
};

export default MyFriendWidget;