import { CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";

const ImageLoader = ({ item, Placeholder }) => {

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
            imageRef.current.src = item.profile_image || Placeholder;
        }
    }, [imageRef]);

    return (
        <div className="image-loader">
            <img
                ref={imageRef}
                src={ClearImage}
                className="candidateLogo"
                width={150}
                height={150}
                alt=""
                onError={(e) => {
                    e.target.src = Placeholder; // Set the backup image source
                }}
            />
            {!imageLoaded && (
                <CircularProgress className="loader-image" />
            )}
        </div>
    );
};

export default ImageLoader;
