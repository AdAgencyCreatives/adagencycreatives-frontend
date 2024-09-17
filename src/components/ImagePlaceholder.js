import { CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ClearImage from "../assets/images/clear.png";

const ImagePlaceholder = ({ data = "C", width = false, height = false }) => {

    useEffect(() => {
    }, []);

    return (
        <div className="image-placeholder" style={{ width: width || '', height: height || '' }}>
            <div className="placeholder-item">{data}</div>
        </div>
    );
};

export default ImagePlaceholder;
