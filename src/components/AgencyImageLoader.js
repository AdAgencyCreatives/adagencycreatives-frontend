import CommonImageLoader from "./CommonImageLoader";

const AgencyImageLoader = ({ agency = null, width = 100, height = 100, className = "agency-image-loader" }) => {

    return (
        <CommonImageLoader
            imageSource={agency?.user_thumbnail || agency.logo}
            charPlaceholder={agency?.name?.length > 0 ? agency.name.charAt(0) : ''}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default AgencyImageLoader;
