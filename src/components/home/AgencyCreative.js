import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";

const AgencyCreatives = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const params = {
      injectStyles: [PaginationStyle],
      // pagination: {
      //   clickable: true,
      //   renderBullet: function (index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + "</span>";
      //   },
      // },
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
    <div id="creatives">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Agency Creatives</h1>
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
                <div className="sliderContent agencies-slider">
                  <img
                    src={Nathan}
                    className="candidateLogo"
                    width={150}
                    height={150}
                  />
                  <div className="agencyName">Nathan Walker</div>
                  <div className="position">Design Lead</div>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="profileLink">
                    <a href="#">View Profile</a>
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

export default AgencyCreatives;
