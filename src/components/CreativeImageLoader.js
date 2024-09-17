import { CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";
import Placeholder from "../assets/images/placeholder.png";
import ImagePlaceholder from "./ImagePlaceholder";

const CreativeImageLoader = ({ creative = null, width = 100, height = 100, className = "candidateLogo" }) => {

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

            imageRef.current.src = creative?.user_thumbnail || creative?.profile_image;
        }
    }, [imageRef]);

    return (
        <div className="image-loader">
            <img
                ref={imageRef}
                src={ClearImage}
                className={className}
                width={width}
                height={height}
                alt=""
                onError={(e) => {
                    setImageLoaded(false);
                }}
                style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && (
                <ImagePlaceholder data={creative?.name?.length > 0 ? creative.name.charAt(0) : 'C'} />
            )}
        </div>
    );
};

export default CreativeImageLoader;
