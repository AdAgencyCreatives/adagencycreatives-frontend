import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Link } from "react-router-dom";
import useAgencies from "../../hooks/useAgencies";
import { Context as AuthContext } from "../../context/AuthContext";
import SliderLoader from "../SliderLoader";
import AgencyImageLoader from "../AgencyImageLoader";
import usePermissions from "../../hooks/usePermissions";

const AdAgencies = () => {

  const [isLoading, setIsLoading] = useState(true);

  const swiperElRef = useRef(null);
  const { home_agencies } = useAgencies("home");

  const {
    state: {
      role,
    },
  } = useContext(AuthContext);

  const {
    isAdmin,
    isAdvisor,
    isAgency,
    isCreative,
    isRecruiter,
    hasSubscription,
  } = usePermissions();

  useEffect(() => {
    if (home_agencies?.length > 0) {
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
        on: {
          afterInit: function () {
            window.setTimeout(() => { setIsLoading(false); }, 500);
          },
        },
      };
      Object.assign(swiperElRef.current, params);
      swiperElRef.current.initialize();
    }
  }, [home_agencies]);

  const handleMouseEnter = () => {
    swiperElRef?.current?.swiper?.autoplay?.stop()
  };

  const handleMouseLeave = () => {
    swiperElRef?.current?.swiper?.autoplay?.start()
  };

  return (
    <div id="agencies">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Featured Agencies</h1>
        <div>
          <Link className="browseAll" to="agencies">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
      {/* Slides */}
      {/* <div className="sectionContent" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> */}
      <div className="sectionContent">
        {isLoading && <SliderLoader columnGap={30} slides={3} />}
        <swiper-container
          class="adagencies"
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
          autop
        >
          {home_agencies && home_agencies.length &&
            home_agencies.map((item, index) => {
              return (
                <swiper-slide key={`home-ad-agencies-${index}`}>
                  <div className="sliderContent adagencies-slider" style={{ height: '350px' }}>
                    <Link to={`/agency/${item.slug}`} className="employer-logo">
                      <AgencyImageLoader agency={item} height={90} width={90} />
                    </Link>
                    <h3 className="employer-title">
                      {item?.name?.length > 0 ? (
                        <Link to={`/agency/${item.slug}`}>{item.name}</Link>
                      ) : (<>&nbsp;</>)}
                    </h3>
                    {item.location.state && item.location.state !== '' ? (
                      <div className="job-location location">
                        {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                        {item?.location?.state?.length && (
                          <>
                            {(isAdmin || (isAdvisor && hasSubscription)) ? (
                              <Link to={`/agencies/location/state/${item.location.state}`}>
                                {item.location.state}
                              </Link>
                            ) : (
                              <span>{item.location.state}</span>
                            )}
                          </>
                        )}
                        {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                        {item?.location?.city?.length && (
                          <>
                            {(isAdmin || (isAdvisor && hasSubscription)) ? (
                              <Link to={`/agencies/location/city/${item.location.city}`}>
                                {item.location.city}
                              </Link>
                            ) : (
                              <span>{item.location.city}</span>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="job-location location no_location">
                        <IoLocationOutline />
                        <a href="">No Location</a>
                      </div>
                    )}
                    <div className="open-jobs-btn">
                      <Link to={`/agency/${item.slug}`}>
                        Open Jobs
                        {/* - {item.open_jobs} */}
                      </Link>
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
