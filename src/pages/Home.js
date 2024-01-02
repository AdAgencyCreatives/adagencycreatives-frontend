import "../styles/Home.css";
import Gather from "../assets/images/Gather.png";
import Mentoring from "../assets/images/Mentoring.png";
import Money from "../assets/images/make-money-white.png";
import { IoSearchOutline } from "react-icons/io5";
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
import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import { Link } from "react-router-dom";

import SlidingMessage from "../components/SlidingMessage";
import MessageModal from "../components/MessageModal";

import usePageDataHelper from "../hooks/usePageDataHelper";

register();

const Home = () => {

  const { pageData, getPateDataItem, getPateDataItemStripped } = usePageDataHelper("home");

  const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
  const showMessageModal = (type, title, message, data) => {
    setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
  };
  const {
    state: { token, role, },
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

  useEffect(() => {
    console.log(pageData);
  }, [])

  return (
    <>
      <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
      <div className="main">
        <div className="banner">
          <h1 className="bannerHeading" dangerouslySetInnerHTML={{ __html: getPateDataItem('title', pageData) }}></h1>
          <p className="subHeading" dangerouslySetInnerHTML={{ __html: getPateDataItem('sub_title', pageData) }}></p>
          <Link className="btn btn-gold film-festival-1 d-none" to="/filmfestival1"
            style={{ fontWeight: "500", fontSize: "18px", marginLeft: "5px", minWidth: "120px" }}>
            Film Festival
          </Link>
          <div className="searchArea">
            <p className="searchHeader" dangerouslySetInnerHTML={{ __html: getPateDataItem("searchbar_heading", pageData) }}></p>
            <div className="searchBox">
              <form action={"/creative-jobs" + (search ? "/search/" + search : "")} onSubmit={(e) => {
                // if (!search || search.length == 0) {
                //   e.preventDefault();
                //   e.stopPropagation();
                //   showMessageModal("error", "Oops!", "Please enter some text to search.");
                //   return false;
                // } else {
                //   return true;
                // }
              }}>
                <div className="row">
                  <div className="col-md-8 col-12 position-relative">
                    {/* <SearchOutline color={"#00000"} width="25px" className="searchIcon" /> */}
                    <IoSearchOutline size={26} className="searchIcon" />
                    <input
                      className="searchInput form-control"
                      type="text"
                      placeholder={getPateDataItemStripped("searchbar_placeholder", pageData)}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <button className="searchBtn">Find Jobs</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="popularSearch">
              <p>
                Popular Searches: <a href="#">Art Director</a>, <a href="#">Copywriter</a>, <a href="#">Designer...</a>
              </p>
            </div>
          </div>
          <div className="featuresContainer container mt-3">
            <div className="row">
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Gather} className="featureImg" />
                <Link
                  to={"/community"}
                  className="featureTitle"
                  onClick={(e) =>
                    validateAccess(e, {
                      roles: ["admin", "creative"],
                      restrictedMessage: "Please login as Creative to access",
                    })
                  }
                  dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_title_gather", pageData) }}></Link>
                <span className="featureDesc" dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_description_gather", pageData) }}></span>
              </div>
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Mentoring} className="featureImg" />
                <Link
                  to={"/mentoring-resources"}
                  className="featureTitle"
                  dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_title_inspire", pageData) }}></Link>
                <span className="featureDesc" dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_description_inspire", pageData) }}></span>
              </div>
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Money} className="featureImg" />
                <Link to={"/creative-jobs"}
                  className="featureTitle"
                  dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_title_do_cool_shit", pageData) }}></Link>
                <span className="featureDesc" dangerouslySetInnerHTML={{ __html: getPateDataItem("motive_description_do_cool_shit", pageData) }}></span>
              </div>
            </div>
          </div>

          {/* <div className="ticker" id="about">
            <div className="ticker-text">
              <h1 className="mt-3">• • • • •</h1>
              <h1 className="mb-0">About Us:</h1>
              <div className="about-content mb-0">
                <h5>Ad Agency Creatives is a community for Creatives to come
                  together talk about the industry talk about the work meet other
                  creatives share ideas and resources manage job opportunities
                  mentor and be mentored and do really cool $#*t!&nbsp;</h5>
              </div>
            </div>
          </div> */}

          <div className="wrapper">
            <div className="marquee">
              <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
              <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
              <p dangerouslySetInnerHTML={{ __html: getPateDataItem("ticker", pageData) }}></p>
            </div>
          </div>
        </div >

        <div className="creative-section">
          <AgencyCreatives />

          {/* Spotlighting Creatives Section */}
          <SpotlightCreative />

          {/* Creative Jobs Section */}
          <CreativeJobs />

          <FeaturedCities />

          <AdAgencies />

          <MentorResources />

          <PublicationResources />
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
