import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Link } from "react-router-dom";

const AdAgencies = () => {
  const swiperElRef = useRef(null);

  const {
    state: { agencies },
    getAgencies,
  } = useContext(AgenciesContext);

  useEffect(() => {
    getAgencies();
  }, []);

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
          {agencies &&
            agencies.map((item, index) => {
              return (
                <swiper-slide key={`slide${index}`}>
                  <div className="sliderContent adagencies-slider">
                    <Link to={`/agency`} className="employer-logo">
                      <img
                        src={item.logo || Placeholder}
                        width={150}
                        height={150}
                        onError={(e) => {
                          e.target.src = Placeholder;
                        }}
                      />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency`}>{item.name}</Link>
                    </h3>
                    {item.location && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/creative-location/${item.location.state}`}>
                          {item.location.state},
                        </Link>
                        <Link to={`/creative-location/${item.location.city}`}>
                          {item.location.city}
                        </Link>
                      </div>
                    )}
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
