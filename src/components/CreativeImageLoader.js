import CommonImageLoader from "./CommonImageLoader";

const CreativeImageLoader = ({ creative = null, width = 100, height = 100, className = "candidateLogo" }) => {

    return (
        <CommonImageLoader
            imageSource={creative?.user_thumbnail || creative?.profile_image}
            charPlaceholder={creative?.name?.length > 0 ? creative.name.charAt(0) : ''}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default CreativeImageLoader;
