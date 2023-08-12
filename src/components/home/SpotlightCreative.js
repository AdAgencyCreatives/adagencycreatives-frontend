import Spotlight from "../../assets/images/Creative-Spotlight-No-Background-600x600.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useRef } from "react";
import { BulletStyle, PaginationStyle } from "../../styles/PaginationStyle";

const SpotlightCreative = () => {
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
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });
  return (
    <>
      <div className="sectionHeader">
        <h1 className="sectionTitle">Spotlighting Creatives</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
        </div>
      </div>

      {/* Slides */}

      <div className="sectionContent full-width" style={{ height: "300px" }}>
        <swiper-container
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
        >
          {Array.apply(11, { length: spotlightSlides }).map((value, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="sliderContent spotlight-slider">
                  <img
                    src={Spotlight}
                    className="spotlight-image"
                    width={150}
                    height={150}
                  />
                  <div className="date">July 10, 2023</div>
                  <a className="spotlight-meta">
                    Creative Director Art, Brant Herzer
                  </a>
                  <div className="watch-link">
                    <a href="#">
                      Watch
                      <IoChevronForwardOutline />
                    </a>
                  </div>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </>
  );
};

export default SpotlightCreative;
