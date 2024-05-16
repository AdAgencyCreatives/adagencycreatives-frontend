import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const SliderLoader = ({ slides = 3, columnGap = 30 }) => {

    useEffect(() => {
    }, []);

    return (
        <div className="slider-loader">
            {Array.from({ length: slides }).map((item, index) => (<>
                <div className="item" style={{ width: 'calc(' + (100.0 / slides) + '% - ' + (slides > 1 ? ((slides - 1) * columnGap / slides) : 0) + 'px' }}><CircularProgress /></div>
            </>))}
        </div>
    );
};

export default SliderLoader;
