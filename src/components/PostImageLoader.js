import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";
import ImagePlaceholder from "./ImagePlaceholder";

const PostImageLoader = ({ post = null }) => {

    const imageRef = useRef();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        return () => {
            setImageLoaded(false);
        };
    }, []);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.onload = () => {
                setImageLoaded(true);
            };

            imageRef.current.src = post?.user_thumbnail || post?.author_avatar;
        }
    }, [imageRef]);

    return (
        <div className="image-loader">
            <img
                ref={imageRef}
                src={ClearImage}
                className="post-avatar"
                width={100}
                height={100}
                alt=""
                onError={(e) => {
                    setImageLoaded(false);
                }}
                style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && (
                <ImagePlaceholder data={post?.author?.length > 0 ? post.author.charAt(0) : 'C'} />
            )}
        </div>
    );
};

export default PostImageLoader;
