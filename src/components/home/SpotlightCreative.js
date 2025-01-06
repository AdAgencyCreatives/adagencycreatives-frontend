import Spotlight from "../../assets/images/creative-spotlight.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { BulletStyle, PaginationStyle } from "../../styles/PaginationStyle";
import { Link } from "react-router-dom";
import { Context as CreativesContext } from "../../context/SpotlightContext";
import useHelper from "../../hooks/useHelper";
import SliderLoader from "../SliderLoader";

const SpotlightCreative = () => {

  const [isLoading, setIsLoading] = useState(true);

  const { decodeEntities } = useHelper();
  const {
    state: { screatives },
    getSCreatives,
  } = useContext(CreativesContext);

  useEffect(() => {
    getSCreatives();
  }, []);

  const swiperElRef = useRef(null);
  const spotlightSlides = 7;

  useEffect(() => {
    const params = {
      injectStyles: [PaginationStyle + BulletStyle],

      pagination: {
        clickable: true,
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
          // spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      on: {
        afterInit: function () {
          window.setTimeout(() => { setIsLoading(false); }, 500);
        },
      },
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });
  return (
    <div id="spotlight">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Spotlighting Creatives</h1>
        <div>
          <Link className="browseAll" to="spotlighting-creatives">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>

      {/* Slides */}

      <div className="sectionContent full-width">
        {isLoading && <SliderLoader columnGap={30} slides={4} />}

        <swiper-container
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
        >
          {screatives &&
            screatives.map((item, index) => {
              return (
                <swiper-slide key={`home-spotlight-creative-${index}`}>
                  <div className="sliderContent spotlight-slider">
                    <Link to={item.url}>
                      <img
                        src={Spotlight}
                        className="spotlight-image"
                        width={150}
                        height={150}
                        alt=""
                      />
                      <div className="date">{item.published_at}</div>
                      <div className="spotlight-meta" dangerouslySetInnerHTML={{ __html: decodeEntities(item.title) }}></div>
                      <div className="watch-link">
                        <div className="">
                          Watch
                          <IoChevronForwardOutline />
                        </div>
                      </div>
                    </Link>
                  </div>
                </swiper-slide>
              );
            })}
        </swiper-container>
      </div>
    </div>
  );
};

export default SpotlightCreative;
