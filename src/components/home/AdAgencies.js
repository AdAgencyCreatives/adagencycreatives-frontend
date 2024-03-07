import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Link } from "react-router-dom";
import useAgencies from "../../hooks/useAgencies";
import { Context as AuthContext } from "../../context/AuthContext";

const AdAgencies = () => {
  const swiperElRef = useRef(null);
  const { agencies } = useAgencies("home");

  const {
    state: {
      role,
    },
  } = useContext(AuthContext);

  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";

  useEffect(() => {
    const params = {
      injectStyles: [PaginationStyle],
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
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

  const handleMouseEnter = () => {
    swiperElRef?.current?.swiper?.autoplay?.stop()
  };

  const handleMouseLeave = () => {
    swiperElRef?.current?.swiper?.autoplay?.start()
  };

  return (
    <div id="agencies">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Advertising Agencies</h1>
        <div>
          <Link className="browseAll" to="agencies">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
      {/* Slides */}
      {/* <div className="sectionContent" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> */}
      <div className="sectionContent">
        <swiper-container
          class="adagencies"
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
        >
          {agencies && agencies.length &&
            agencies.sort(() => Math.random() - 0.5).map((item, index) => {
              return (
                <swiper-slide key={`slide${index}`}>
                  <div className="sliderContent adagencies-slider" style={{ height: '350px' }}>
                    <Link to={`/agency/${item.slug}`} className="employer-logo">
                      <img
                        src={item.logo || Placeholder}
                        width={150}
                        height={150}
                        onError={(e) => {
                          e.target.src = Placeholder;
                        }}
                        alt=""
                      />
                    </Link>
                    <h3 className="employer-title">
                      {item?.name?.length ? (
                        <Link to={`/agency/${item.slug}`}>{item.name}</Link>
                      ) : (<>&nbsp;</>)}
                    </h3>
                    {item.location.state && item.location.state !== '' ? (
                      <div className="job-location location">
                        {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                        {item?.location?.state?.length && (
                          <Link to={`/agencies/location/state/${item.location.state}`}>
                            {item.location.state}
                          </Link>
                        )}
                        {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                        {item?.location?.city?.length && (
                          <Link to={`/agencies/location/city/${item.location.city}`}>
                            {item.location.city}
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="job-location location no_location">
                        <IoLocationOutline />
                        <a href="">No Location</a>
                      </div>
                    )}
                    <div className="open-jobs-btn">
                      <Link to={`/agency/${item.slug}`}>Open Jobs - {item.open_jobs}</Link>
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
