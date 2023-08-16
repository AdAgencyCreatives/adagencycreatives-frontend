import Mischief from "../../assets/images/Mischief-1.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";

const AdAgencies = () => {

  const swiperElRef = useRef(null);

  useEffect(() => {
    const params = {
      injectStyles: [PaginationStyle],
      breakpoints: {
        500: {
          slidesPerView: 2,
          // spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      },
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });

  return (
    <div id="agencies">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Advertising Agencies</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      {/* Slides */}
      <div className="sectionContent">
        <swiper-container
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
        >
          {Array.apply(11, { length: 10 }).map((value, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="sliderContent adagencies-slider">
                  <a href="#" className="employer-logo">
                    <img src={Mischief} width={150} height={150} />
                  </a>
                  <h3 className="employer-title">
                    <a href="#">Mischief</a>
                  </h3>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="open-jobs-btn">
                    <a href="#">Open Jobs - 0</a>
                  </div>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </div>
  );
};

export default AdAgencies;
