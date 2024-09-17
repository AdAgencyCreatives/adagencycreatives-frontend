import CommonImageLoader from "./CommonImageLoader";

const CommentImageLoader = ({ comment = null, width = 100, height = 100, className = "candidateLogo" }) => {

    return (
        <CommonImageLoader
            imageSource={comment?.user_thumbnail || comment?.profile_image}
            charPlaceholder={comment?.user?.length > 0 ? comment.user.charAt(0) : ''}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default CommentImageLoader;
