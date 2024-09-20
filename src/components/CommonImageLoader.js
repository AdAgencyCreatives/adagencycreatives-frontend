import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";
import ImagePlaceholder from "./ImagePlaceholder";
import { CircularProgress } from '@mui/material';

const CommonImageLoader = ({ imageSource = "", charPlaceholder = "C", width = false, height = false, className = "" }) => {

    const imageRef = useRef();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setImageLoaded(false);
        setShowLoader(false);
    }, []);

    useEffect(() => {
        setImageLoaded(false);
        showLoader(false);
        if (imageRef.current && imageRef.current.src != imageSource) {
            imageRef.current.onload = () => {
                setImageLoaded(true);
                setShowLoader(false);
            };
            setShowLoader(true);
            imageRef.current.src = imageSource;
        }
    }, [imageSource]);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.onload = () => {
                setImageLoaded(true);
                setShowLoader(false);
            };
            setShowLoader(true);
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
                    setShowLoader(false);
                }}
                style={{ display: imageLoaded ? 'block' : 'none', width: width || '', height: height || '' }}
            />
            {!imageLoaded && (
                <ImagePlaceholder data={charPlaceholder} width={width} height={height} />
            )}
            {showLoader && <div className="image-loading"><CircularProgress size={30} /></div>}
        </div>
    );
};

export default CommonImageLoader;
