import Employer from "../../assets/images/david-and-goliath.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Tooltip } from "@mui/material";

const CreativeJobs = () => {
  const swiperElRef = useRef(null);
  const jobSlides = 3;

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
        },
      },
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });

  return (
    <div id="jobs">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Creative Jobs</h1>
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
          centeredSlides="true"
        >
          {Array.apply(11, { length: jobSlides }).map((value, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="sliderContent job-slider p-3 p-md-4">
                  <div className="left-badge">
                    <Tooltip title="Featured">
                      <button className="btn p-0 border-0">
                        <IoStar
                          size={20}
                          color="black"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                    <Tooltip title="Urgent">
                      <button className="btn p-0 border-0">
                        <IoStar
                          size={20}
                          color="#d3a11f"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="right-badge">
                    <a href="#">
                      <span>Full-Time</span>
                    </a>
                  </div>
                  <a href="#" className="employer-logo">
                    <img src={Employer} width={150} height={150} />
                  </a>
                  <h3 className="employer-title">
                    <a href="#">David&Goliath</a>
                  </h3>
                  <h3 className="job-title">Junior Copywriter</h3>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Los Angeles,</a>
                    <a href="#">California</a>
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

export default CreativeJobs;
