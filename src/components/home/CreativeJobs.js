import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline, IoStar } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import Tooltip from "../Tooltip";
import { Context as JobsContext } from "../../context/JobsContext";
import { Link } from "react-router-dom";

const CreativeJobs = () => {
  const swiperElRef = useRef(null);
  const jobSlides = 3;

  const {
    state: { jobs },
    getJobs,
  } = useContext(JobsContext);

  useEffect(() => {
    getJobs();
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
          {jobs &&
            jobs.map((item, index) => {
              return (
                <swiper-slide key={`slide${index}`}>
                  <div className="sliderContent job-slider p-3 p-md-4">
                    <div className="left-badge">
                      {item.priority.is_featured && (
                        <Tooltip title="Featured" type="featured">
                          <button className="btn p-0 border-0 me-2">
                            <IoStar
                              size={15}
                              className="icon-rounded star-badge featured"
                            />
                          </button>
                        </Tooltip>
                      )}
                      {item.priority.is_urgent && (
                        <Tooltip title="Urgent" type="urgent">
                          <button className="btn p-0 border-0 me-2">
                            <IoStar
                              size={15}
                              className="icon-rounded star-badge urgent"
                            />
                          </button>
                        </Tooltip>
                      )}
                    </div>
                    <div className="right-badge">
                      <Link
                        to={`/job-type/${item.employment_type.toLowerCase()}`}
                      >
                        <span>{item.employment_type}</span>
                      </Link>
                    </div>
                    <Link to={`/job/`} className="employer-logo">
                      <img
                        src={item.agency.logo}
                        width={150}
                        height={150}
                        onError={(e) => {
                          e.target.src = Placeholder;
                        }}
                      />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency`}>{item.agency.name}</Link>
                    </h3>
                    <h3 className="job-title">
                      <Link to={`/job/`} className="link-dark">{item.title}</Link>
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
