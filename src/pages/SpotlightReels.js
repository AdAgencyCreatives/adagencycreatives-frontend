import AdAgency from "../assets/images/AdAgency.png";
import "../styles/SpotlightCreative.css";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../context/SpotlightContext";
import useHelper from "../hooks/useHelper";

import { useHistoryState } from "../hooks/useHistoryState";
import SpotlightReelSingle from "../components/home/SpotlightReelSingle";

const SpotlightCreatives = () => {

    const [input, setInput] = useHistoryState("input", "");

    const { decodeEntities } = useHelper();

    const {
        state: { screatives },
        getSCreatives,
    } = useContext(Context);

    useEffect(() => {
        if (input?.length > 0) {
            searchSCreative(input);
        } else {
            getSCreatives();
        }
    }, []);

    const searchSCreative = (keyword) => {
        getSCreatives(keyword);
    };

    return (
        <div className="dark-container page-spotlight mb-0 mt-4">
            <div className="container p-md-0 px-5 bbb">
                <h1 className="community-title text-white text-center mb-4">
                    Creative Reels
                </h1>
                <SearchBar
                    input={input}
                    setInput={setInput}
                    placeholder="Search by name or title"
                    onSearch={searchSCreative}
                />
                <div className="row g-4">
                    {screatives &&
                        screatives.map((item, index) => {
                            let data = decodeEntities(item.title);
                            if (data.indexOf("<br>") >= 0) {
                                data = data.split('<br>');
                            } else {
                                data = [data];
                            }
                            return (
                                <div className="col-sm-6 col-md-4" key={index}>
                                    <SpotlightReelSingle item={item} index={index} />
                                </div>
                            );
                        })}
                </div>
            </div >
        </div >
    );
};

export default SpotlightCreatives;
