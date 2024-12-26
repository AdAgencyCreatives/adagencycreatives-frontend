import AdAgency from "../../assets/images/AdAgency.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { Context as SpotlightContext } from "../../context/SpotlightContext";
import { useContext, useEffect, useRef } from "react";
import { BulletStyle, ResourcePaginationStyle } from "../../styles/PaginationStyle";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useState } from "react";
import useHelper from "../../hooks/useHelper";

const SpotlightReels = () => {

    const [isLoading, setIsLoading] = useState(true);

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
        const params = {
            injectStyles: [ResourcePaginationStyle + BulletStyle],

            pagination: {
                clickable: true,
                renderBullet: function (index, className) {
                    //   return '<span class="' + className + '">' + (index + 1) + "</span>";
                    return '';
                },
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
    });

    return (
        <div id="mentors" className={'home-resources spotlight-reels'}>
            <div className="sectionHeader">
                <h1 className="sectionTitle">Spotlight Reels</h1>
                <div>
                    <Link className="browseAll" to="spotlighting-creatives">
                        browse all <MdKeyboardDoubleArrowRight />
                    </Link>
                </div>
            </div>

            <div className="sectionContent mentors-section">
                <>
                    <swiper-container
                        ref={swiperElRef}
                        init="false"
                        navigation="true"
                        slides-per-view="1"
                        space-between="10"
                        loop="true"
                    >
                        {screatives?.length > 0 && screatives.map((item, index) => {
                            let data = decodeEntities(item.title);
                            if (data.indexOf("<br>") >= 0) {
                                data = data.split('<br>');
                            } else {
                                data = [data];
                            }
                            return (
                                <swiper-slide key={`slide${index}`}>
                                    <Link to={item.url} className="mentor" key={`m_${index}`} style={{ fontSize: '16px', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '1.125em', letterSpacing: '0.15em', minHeight: '30px' }}>Introducing</span>
                                        <span style={{ fontSize: '2.625em', lineHeight: '1em', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{data[0]}</span>
                                        <span style={{ fontSize: '1em', fontWeight: 'normal', fontFamily: 'JOST', lineHeight: '1em', minHeight: '30px' }}>{data[1]}</span>
                                        <span style={{ position: 'absolute', right: '10px', bottom: '5px', fontSize: '0.75em', fontFamily: 'JOST', fontWeight: 'normal' }}>View &rsaquo;&rsaquo;</span>
                                    </Link>
                                </swiper-slide>
                            );
                        })}
                    </swiper-container>
                </>
            </div>
        </div >
    );
};

export default SpotlightReels;
