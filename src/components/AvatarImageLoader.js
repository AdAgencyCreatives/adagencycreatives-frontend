import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";
import CommonImageLoader from "./CommonImageLoader";

const AvatarImageLoader = ({ user = null, width = 50, height = 50, className = "avatar-rounded rounded-circle object-fit-cover" }) => {
    return (
        <CommonImageLoader imageSource={user?.user_thumbnail || user?.image} charPlaceholder={user?.first_name?.length > 0 ? user.first_name.charAt(0) : 'C'} width={width} height={height} className={className} />
    );
};

export default AvatarImageLoader;
