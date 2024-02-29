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

register();

const Home = () => {

  const { pageData, getPateDataItem } = usePageDataHelper("home");

  const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
  const showMessageModal = (type, title, message, data) => {
    setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
  };
  const {
    state: { token, role },
  } = useContext(AuthContext);

  const [search, setSearch] = useState("")

  const { showAlert } = useContext(AlertContext);

  const validateAccess = (e, item) => {
    if (item && item.roles && item.roles.length > 0) {
      for (let index = 0; index < item.roles.length; index++) {
        const roleToCompare = item.roles[index];
        if (role && role == roleToCompare) {
          return true;
        }
      }

      e.preventDefault();
      e.stopPropagation();

      showAlert(item.restrictedMessage);

      return false;
    }
    return true;
  };

  const getLandingBoxLink = (num) => {
    if (num === 1) {
      return '/creative-jobs';
    } else if (num === 2) {
      return token ? 'post-a-job' : '#register_agency';
    }

    return token ? (role == 'creative' ? 'community' : 'dashboard') : '#register_creative';
  }

  return (
    <>
      <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
      <div className="main home-page">
        <div className="banner">
          <h1 className="bannerHeading" dangerouslySetInnerHTML={{ __html: getPateDataItem('title', pageData) }}></h1>
          <p className="subHeading" dangerouslySetInnerHTML={{ __html: getPateDataItem('sub_title', pageData) }}></p>
          <Link className="btn btn-gold film-festival-1 d-none" to="/filmfestival1"
            style={{ fontWeight: "500", fontSize: "18px", marginLeft: "5px", minWidth: "120px" }}>
            Film Festival
          </Link>
          <div className="container">
            <div className="row content gy-3 hero-boxes">
              {[1,2,3].map(num => (
                <div className="col-lg-4 col-md-4 col-12 hero-box">
                <Link
                  // className={`box link-light ${item.img ? "flip" : ""}`}
                  className="box link-light flip"
                  to={getLandingBoxLink(num)}
                >
                  <div className="flip-card-front">
                    <div className="main-title" dangerouslySetInnerHTML={{ __html: getPateDataItem('landing_block' + num + '_title', pageData) }}></div>
                    <div className="footer">
                      <div className="title-small" dangerouslySetInnerHTML={{ __html: getPateDataItem('landing_block' + num + '_subtitle', pageData) }}></div>
                      <div className="box-link-front">
                        <div className="link">
                          <IoArrowForward color="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="content" dangerouslySetInnerHTML={{ __html: getPateDataItem('landing_block' + num + '_content', pageData) }}></div>
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
              <p class="subHeading motive">
                <Link className="" to={"/community"} dangerouslySetInnerHTML={{ __html: getPateDataItem('motive_title_gather', pageData) }}
                  onClick={(e) =>
                    validateAccess(e, {
                      roles: ["admin", "creative"],
                      restrictedMessage: "Please login as a Creative to access",
                    })
                  }></Link>
                <Link className="" to={"/mentoring-resources"} dangerouslySetInnerHTML={{ __html: getPateDataItem('motive_title_inspire', pageData) }}></Link>
                <Link className="" to={"/creative-jobs"} dangerouslySetInnerHTML={{ __html: getPateDataItem('motive_title_do_cool_shit', pageData) }}></Link>
              </p>
            </div>
          </div>

          <div className="wrapper">
            <Link to="/about" className="black">
              <div className="marquee">
                <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
                <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
                <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
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
              <h1 className="sectionTitle">Say, Hello</h1>
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
