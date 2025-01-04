import AdAgency from "../../assets/images/AdAgency.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import useHelper from "../../hooks/useHelper";
import { useState } from "react";

const SpotlightReelSingle = ({ item, index }) => {

    const [showVideo, setShowVideo] = useState(false);

    const { decodeEntities } = useHelper();

    let data = decodeEntities(item.title);
    if (data.indexOf("<br>") >= 0) {
        data = data.split('<br>');
    } else {
        data = [data];
    }

    useEffect(() => {
    }, []);

    return (<>
        <Link to={item.url} className="spotlight-reel" key={`m_${index}`} style={{ fontSize: '16px', flexDirection: 'column' }}
            onClick={(e) => {
                if (!showVideo) {
                    setShowVideo(true);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                return true;
            }}>
            <video autoPlay muted style={{ display: showVideo ? 'block' : 'none' }}>
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {!showVideo && (<>
                <span className="view">View &gt;</span>
                <span className="flex-centered intro">Introducing</span>
                <span className="flex-centered title">{data[0]}</span>
                <span className="flex-centered category">{data[1]}</span>
                <img src={AdAgency} height={150} width={150} alt="" />
            </>)}
        </Link>
    </>);
};

export default SpotlightReelSingle;
