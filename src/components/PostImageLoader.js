import CommonImageLoader from "./CommonImageLoader";

const PostImageLoader = ({ post = null, width = false, height = false, className = "post-avatar" }) => {

    return (
        <CommonImageLoader
            imageSource={post?.user_thumbnail || post?.author_avatar}
            charPlaceholder={post?.author?.length > 0 ? post.author.charAt(0) : 'C'}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default PostImageLoader;
