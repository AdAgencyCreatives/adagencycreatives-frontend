import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import Tooltip from "../Tooltip";
import { Context as JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import SliderLoader from "../SliderLoader";
import AgencyImageLoader from "../AgencyImageLoader";
import usePermissions from "../../hooks/usePermissions";
import { IoChevronBackOutline } from "react-icons/io5";

const CreativeJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [renderedJobs, setRenderedJobs] = useState(null);

  const swiperElRef = useRef(null);
  const jobSlides = 3;

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

  const {
    state: { jobs },
    getFeaturedJobs,
  } = useContext(JobsContext);

  useEffect(() => {
    getFeaturedJobs();
  }, []);

  useEffect(() => {
    if(jobs && jobSlides < jobs?.length && jobSlides * 2 > jobs?.length) setRenderedJobs(jobs.concat(jobs));
    else setRenderedJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    if (renderedJobs?.length > 0) {
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
            loopAdditionalSlides: 2, // Helps Swiper duplicate slides properly
            loopFillGroupWithBlank: true, // Fills empty spaces for smooth looping
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
  }, [renderedJobs]);

  return (
    <div id="jobs">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Creative Jobs</h1>
        <div>
          <Link className="browseAll" to="creative-jobs">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>

      {/* Slides */}

      <div className="sectionContent">
        {isLoading && <SliderLoader columnGap={30} slides={3} />}
        <swiper-container
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
        >
          {renderedJobs &&
            renderedJobs.map((item, index) => {
              return (
                <swiper-slide key={`home-creative-jobs-${index}`}>
                  <div className="sliderContent job-slider p-3 p-md-4">
                    <div className="left-badge">
                      {Object.keys(item.priority).map((key) => {
                        if (item.priority[key]) {
                          let parts = key.split("_");
                          let type = parts[1];
                          return (
                            <Tooltip title={type} type={type} key={"tool_" + key}>
                              <button className="btn p-0 border-0 me-2">
                                <IoStar
                                  size={20}
                                  className={"icon-rounded star-badge " + type}
                                />
                              </button>
                            </Tooltip>
                          );
                        }
                      })}
                      {Object.keys(item.workplace_preference).map((key) => {
                        if (item.workplace_preference[key]) {
                          let parts = key.split("_");
                          let type = parts[1];
                          return (
                            <Tooltip title={type} type={type} key={"tool_" + key}>
                              <button className="btn p-0 border-0 me-2">
                                <IoStar
                                  size={20}
                                  className={"icon-rounded star-badge " + type}
                                />
                              </button>
                            </Tooltip>
                          );
                        }
                      })}
                    </div>
                    <div className="right-badge">
                      <Link
                        to={`/job-type/${item.employment_type.toLowerCase()}`}
                      >
                        <span>{item.employment_type}</span>
                      </Link>
                    </div>
                    <Link to={`/job/${item.slug}`} className="employer-logo">
                      <AgencyImageLoader agency={item.agency} height={90} width={90} />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency/${item.agency.slug}`}>
                        {item.agency.name}
                      </Link>
                    </h3>
                    <h3 className="job-title">
                      <Link to={`/job/${item.slug}`} className="link-dark">
                        {item.title}
                      </Link>
                    </h3>
                    {item.location && (
                      <div className="job-location location">
                        {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                        {(isAdmin || (isAdvisor && hasSubscription)) ? (
                          <Link to={`/job-location-state/${item.location.state}`}>
                            {item.location.state}
                          </Link>
                        ) : (
                          <span>{item.location.state}</span>
                        )}
                        {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                        {(isAdmin || (isAdvisor && hasSubscription)) ? (
                          <Link to={`/job-location-city/${item.location.city}`}>
                            {item.location.city}
                          </Link>
                        ) : (
                          <span>{item.location.city}</span>
                        )}
                      </div>
                    )}
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
