import "../styles/Home.css";
import Gather from "../assets/images/Gather.png";
import Mentoring from "../assets/images/Mentoring.png";
import Money from "../assets/images/make-money-white.png";
import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
// core version + navigation, pagination modules:
import { register } from "swiper/element/bundle";
import "swiper/css/pagination";
// import "swiper/css/autoplay";
import AgencyCreatives from "../components/home/AgencyCreative";
import AdAgencies from "../components/home/AdAgencies";
import MentorResources from "../components/home/MentorResources";
import PublicationResources from "../components/home/PublicationResources";
import FeaturedCities from "../components/home/FeaturedCities";
import SpotlightCreative from "../components/home/SpotlightCreative";
import CreativeJobs from "../components/home/CreativeJobs";
import { useState, useContext, useEffect, useRef } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import { Link } from "react-router-dom";

import SlidingMessage from "../components/SlidingMessage";
import MessageModal from "../components/MessageModal";

import usePageDataHelper from "../hooks/usePageDataHelper";
import useHelper from "../hooks/useHelper";

register();

const Home = () => {

  const { validateAccess } = useHelper();

  const { pageData, getPageDataItem } = usePageDataHelper("home");

  const tickerData = getPageDataItem("ticker", pageData);

  const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
  const showMessageModal = (type, title, message, data) => {
    setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
  };

  const {
    state: { token, role },
    setPageClass,
  } = useContext(AuthContext);

  const Ticker = ({ times }) => {

    let tickerArray = [];
    let limit = times ? times : 1;

    for (let index = 0; index < limit; index++) {
      tickerArray[index] = tickerData;
    }

    return (
      <>
        {tickerArray?.length > 0 && tickerArray.map((item) => <p dangerouslySetInnerHTML={{ __html: item }}></p>)}
      </>
    );
  };

  return (
    <>
      <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
      <div className="main home-page">
        <div className="banner">
          <h1 className="bannerHeading" dangerouslySetInnerHTML={{ __html: getPageDataItem('title', pageData) }}></h1>
          <p className="subHeading" dangerouslySetInnerHTML={{ __html: getPageDataItem('sub_title', pageData) }}></p>
          <Link className="btn btn-gold film-festival-1 d-none" to="/filmfestival1"
            style={{ fontWeight: "500", fontSize: "18px", marginLeft: "5px", minWidth: "120px" }}>
            Film Festival
          </Link>
          <div className="container">
            <div className="row content gy-3 hero-boxes">
              {[
                { "num": 1, "url": "/creative-jobs" },
                { "num": 2, "url": token ? 'post-a-job' : '#register_agency' },
                { "num": 3, "url": token ? (role == 'creative' ? 'community' : 'dashboard') : '#register_creative' },
              ].map(item => (
                <div key={"flip-card-key-" + item?.num} className="col-lg-4 col-md-4 col-12 hero-box">
                  <Link
                    // className={`box link-light ${item.img ? "flip" : ""}`}
                    className="box link-light flip"
                    to={item?.url}
                  >
                    <div className="flip-card-front">
                      <div className="main-title" dangerouslySetInnerHTML={{ __html: getPageDataItem('landing_block' + item?.num + '_title', pageData) }}></div>
                      <div className="footer">
                        <div className="title-small" dangerouslySetInnerHTML={{ __html: getPageDataItem('landing_block' + item?.num + '_subtitle', pageData) }}></div>
                        <div className="box-link-front">
                          <div className="link">
                            <IoArrowForward color="white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div className="content" dangerouslySetInnerHTML={{ __html: getPageDataItem('landing_block' + item?.num + '_content', pageData) }}></div>
                      <div className="box-link-back">
                        <p>click to go</p>
                        <div className="link">
                          <IoArrowForward color="black" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div>
              <p className="subHeading motive">
                <Link className="" to={"/community"} dangerouslySetInnerHTML={{ __html: getPageDataItem('motive_title_gather', pageData) }}
                  onClick={(e) =>
                    validateAccess(e, {
                      roles: ["admin", "creative"],
                      restrictedMessage: "Please login as a Creative to access",
                    })
                  }></Link>
                <Link className="" to={"/mentoring-resources"} dangerouslySetInnerHTML={{ __html: getPageDataItem('motive_title_inspire', pageData) }}></Link>
                <Link className="" to={"/creative-jobs"} dangerouslySetInnerHTML={{ __html: getPageDataItem('motive_title_do_cool_shit', pageData) }}></Link>
              </p>
            </div>
          </div>

          <div className="wrapper">
            <Link to="/about" className="black">
              <div className="marquee">
                <Ticker times={12} />
              </div>
            </Link>
          </div>
        </div >

        <div className="creative-section">
          <AgencyCreatives validateAccess={validateAccess} />

          <MentorResources />

          {/* Creative Jobs Section */}
          <CreativeJobs />

          {/* Spotlighting Creatives Section */}
          <SpotlightCreative />

          <AdAgencies />

          <PublicationResources />

          <FeaturedCities />

          <div id="feedback">
            <div className="sectionHeader">
              <h1 className="sectionTitle">Say Hello</h1>
            </div>
            <div className="contact-section">
              <div className="row">
                <div className="text-center text-sm-start col-xs-12 col-sm-8 col-md-12">
                  <h3 className="title">
                    Do you have feedback or want to become a contributor?
                  </h3>
                  <div className="contact-btn">
                    <Link to="/contact">
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Home;
