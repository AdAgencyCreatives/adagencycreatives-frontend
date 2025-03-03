import AdAgency from "../../assets/images/AdAgency.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { Context as SpotlightContext } from "../../context/SpotlightContext";
import { useContext, useEffect, useRef } from "react";
import { BulletStyle, ResourcePaginationStyle, PaginationStyle } from "../../styles/PaginationStyle";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useState } from "react";
import useHelper from "../../hooks/useHelper";
import SpotlightReelSingle from "./SpotlightReelSingle";

const SpotlightReels = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [screativesRender, setScreativesRender] = useState(true);

    const { decodeEntities } = useHelper();
    const {
        state: { screatives },
        getSCreatives,
    } = useContext(SpotlightContext);

    useEffect(() => {
        getSCreatives();
    }, []);

    const swiperElRef = useRef(null);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        let slidesPerView = 5;
        if (width <= 500) {
            slidesPerView = 2;
        } else if (width <= 768) {
            slidesPerView = 3;
        } else if (width <= 992) {
            slidesPerView = 4;
        }

        if(screatives && slidesPerView < screatives?.length && slidesPerView * 2 > screatives?.length) {
            let rendered = screatives.concat(screatives);
            rendered = rendered.slice(0, (slidesPerView * 2) + 1);

            setScreativesRender(rendered);
        } else setScreativesRender(screatives);
    }, [screatives]);

    useEffect(() => {
        if (screativesRender?.length > 0) {
            const params = {
                injectStyles: [ResourcePaginationStyle + BulletStyle],
                pagination: {
                    clickable: true,
                    // renderBullet: (index, className) => {
                    //     return `<span class="${className}"></span>`;
                    // },
                },
                breakpoints: {
                    500: {
                        slidesPerView: 2
                        // spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1249: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    }
                },
            };
            Object.assign(swiperElRef.current, params);
            swiperElRef.current.initialize();
        }
    }, [screativesRender]);

    return (
        <div id="spotlight" className={'home-resources spotlight-reels'}>
            <div className="sectionHeader">
                <h1 className="sectionTitle">Spotlight Reels</h1>
                <div>
                    <Link className="browseAll" to="spotlight-reels">
                        browse all <MdKeyboardDoubleArrowRight />
                    </Link>
                </div>
            </div>

            <div className="sectionContent spotlight-reel-section">
                <>
                    <swiper-container
                        ref={swiperElRef}
                        init="false"
                        navigation="false"
                        pagination="true"
                        slides-per-view="1"
                        space-between="10"
                        loop="true"
                    >
                        {screativesRender?.length > 0 && screativesRender.map((item, index) => {
                            return (
                                <swiper-slide key={`spotlight-reels-${index}`}>
                                    <SpotlightReelSingle item={item} index={index} />
                                </swiper-slide>
                            );
                        })}
                        <div className="swiper-pagination" slot="pagination"></div>
                    </swiper-container>
                </>
            </div>
        </div >
    );
};

export default SpotlightReels;
