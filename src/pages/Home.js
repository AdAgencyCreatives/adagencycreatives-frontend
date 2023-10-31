import "../styles/Home.css";
import Gather from "../assets/images/Gather.png";
import Mentoring from "../assets/images/Mentoring.png";
import Money from "../assets/images/make-money-white.png";
import { IoSearchOutline } from "react-icons/io5";
// core version + navigation, pagination modules:
import { register } from "swiper/element/bundle";
import "swiper/css/pagination";
import AgencyCreatives from "../components/home/AgencyCreative";
import AdAgencies from "../components/home/AdAgencies";
import MentorResources from "../components/home/MentorResources";
import PublicationResources from "../components/home/PublicationResources";
import FeaturedCities from "../components/home/FeaturedCities";
import SpotlightCreative from "../components/home/SpotlightCreative";
import CreativeJobs from "../components/home/CreativeJobs";
import { useState, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import SlidingMessage from "../components/SlidingMessage";

register();

const Home = () => {
  const { state: {token, role} } = useContext(AuthContext);

  const [slidingMessage, setSlidingMessage] = useState("");

  const validateAccess = (e, item) => {
    if (item && item.roles && item.roles.length > 0) {
      for (let index = 0; index < item.roles.length; index++) {
        const roleToCompare = item.roles[index];
        if (role == roleToCompare) {
          return true;
        }
      }
      setSlidingMessage(item.restrictedMessage);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  };

  console.log(token);
  return (
    <>
      <SlidingMessage message={slidingMessage} setMessage={setSlidingMessage} />
      <div className="main">
        <div className="banner">
          <h1 className="bannerHeading">Welcome to Ad Agency Creatives</h1>
          <p className="subHeading">
            An all inclusive community for Advertising Agency Creatives
          </p>
          <div className="searchArea">
            <p className="searchHeader">Search Creative Jobs</p>
            <div className="searchBox">
              <form action="/creative-jobs">
                <div className="row">
                  <div className="col-md-8 col-12 position-relative">
                    {/* <SearchOutline color={"#00000"} width="25px" className="searchIcon" /> */}
                    <IoSearchOutline size={26} className="searchIcon" />
                    <input
                      className="searchInput form-control"
                      type="text"
                      placeholder="Search by name, title, location, company, in"
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
                Popular Searches: <a href="#">Art Director</a>,
                <a href="#">Copywriter</a>,<a href="#">Designer...</a>
              </p>
            </div>
          </div>
          <div className="featuresContainer container mt-3">
            <div className="row">
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Gather} className="featureImg" />
                <Link to={"/community"} className="featureTitle" onClick={(e) => validateAccess(e, { roles: ["admin", "creative"], restrictedMessage: 'Please login as Creative to access' })}>Gather</Link>
                <span className="featureDesc">
                  Social creative
                  <br />
                  community
                </span>
              </div>
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Mentoring} className="featureImg" />
                <Link to={"/mentoring-resources"} className="featureTitle">Inspire</Link>
                <span className="featureDesc">
                  Mentors and <br /> resources
                </span>
              </div>
              <div className="featureBox col-md-4 col-12 mb-5 mb-md-0">
                <img src={Money} className="featureImg" />
                <Link to={"/creative-jobs"} className="featureTitle">Do Cool $#*t!</Link>
                <span className="featureDesc">
                  Creative jobs <br />
                  board
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="section about text-center" id="about">
          <h1>About Us</h1>
          <div className="about-content">
            <h5>Ad Agency Creatives is a</h5>
            <h5>community for Creatives</h5>
            <h5>to come together</h5>
            <h5>talk about the industry</h5>
            <h5>talk about the work</h5>
            <h5>meet other creatives</h5>
            <h5>share ideas and resources</h5>
            <h5>manage job opportunities</h5>
            <h5>mentor and be mentored</h5>
            <h5>and do really cool $#*t!&nbsp;</h5>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Home;
