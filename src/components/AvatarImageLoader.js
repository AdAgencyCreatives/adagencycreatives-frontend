import CommonImageLoader from "./CommonImageLoader";

const AvatarImageLoader = ({ user = null, width = 50, height = 50, className = "avatar-rounded rounded-circle object-fit-cover" }) => {
    return (
        <CommonImageLoader
            imageSource={user?.user_thumbnail || (user?.role == "creative" ? user?.image : user?.logo)}
            charPlaceholder={user?.first_name?.length > 0 ? user.first_name.charAt(0) : ''}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default AvatarImageLoader;
