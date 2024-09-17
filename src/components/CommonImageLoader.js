import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";
import ImagePlaceholder from "./ImagePlaceholder";

const CommonImageLoader = ({ imageSource = "", charPlaceholder = "C", width = false, height = false, className = "" }) => {

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

            imageRef.current.src = imageSource;
        }
    }, [imageRef]);

    return (
        <div className="image-loader">
            <img
                ref={imageRef}
                src={ClearImage}
                className={className}
                width={width || 50}
                height={height || 50}
                alt=""
                onError={(e) => {
                    setImageLoaded(false);
                }}
                style={{ display: imageLoaded ? 'block' : 'none', width: width || '', height: height || '' }}
            />
            {!imageLoaded && (
                <ImagePlaceholder data={charPlaceholder} width={width} height={height} />
            )}
        </div>
    );
};

export default CommonImageLoader;
