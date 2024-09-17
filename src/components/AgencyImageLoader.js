import CommonImageLoader from "./CommonImageLoader";

const AgencyImageLoader = ({ agency = null, width = 100, height = 100, className = "candidateLogo" }) => {

    return (
        <CommonImageLoader
            imageSource={agency?.user_thumbnail || agency.logo}
            charPlaceholder={agency?.name?.length > 0 ? agency.name.charAt(0) : 'C'}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default AgencyImageLoader;
