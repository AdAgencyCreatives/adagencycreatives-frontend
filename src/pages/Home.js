import "../styles/Home.css";
import Gather from "../assets/images/Gather.png";
import Mentoring from "../assets/images/Mentoring.png";
import Money from "../assets/images/make-money-white.png";
import Employer from "../assets/images/david-and-goliath.png";
import Spotlight from "../assets/images/Creative-Spotlight-No-Background-600x600.png";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// core version + navigation, pagination modules:
import { register } from "swiper/element/bundle";
import { Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css/pagination";
import AgencyCreatives from "../components/home/AgencyCreative";
import AdAgencies from "../components/home/AdAgencies";
import MentorResources from "../components/home/MentorResources";
import PublicationResources from "../components/home/PublicationResources";
import FeaturedCities from "../components/home/FeaturedCities";

register();

const Home = () => {
  const candidateSlides = 5;
  const spotlightSlides = 7;
  const jobSlides = 3;
  const swiperElRef = useRef(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      console.log("cc");
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  useEffect(() => {});

  return (
    <div className="main">
      <div className="banner">
        <h1 className="bannerHeading">Welcome to Ad Agency Creatives</h1>
        <p className="subHeading">
          An all inclusive community for Advertising Agency Creatives
        </p>
        <div className="searchArea">
          <p className="searchHeader">Search Creative Jobs</p>
          <div className="searchBox">
            <div className="row">
              <div className="col-8 position-relative">
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
          </div>
          <div className="popularSearch">
            <p>
              Popular Searches: <a href="#">Art Director</a>,
              <a href="#">Copywriter</a>,<a href="#">Designer...</a>
            </p>
          </div>
        </div>
        <div className="featuresContainer container">
          <div className="row">
            <div className="featureBox col">
              <img src={Gather} className="featureImg" />
              <span className="featureTitle">Gather</span>
              <span className="featureDesc">
                Social creative
                <br />
                community
              </span>
            </div>
            <div className="featureBox col">
              <img src={Mentoring} className="featureImg" />
              <span className="featureTitle">Inspire</span>
              <span className="featureDesc">
                Mentors and <br /> resources
              </span>
            </div>
            <div className="featureBox col">
              <img src={Money} className="featureImg" />
              <span className="featureTitle">Do Cool $#*t!</span>
              <span className="featureDesc">
                Creative jobs <br />
                board
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section about text-center">
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
        <div className="sectionHeader">
          <h1 className="sectionTitle">Spotlighting Creatives</h1>
          <div className="browseAll">
            browse all <MdKeyboardDoubleArrowRight />
          </div>
        </div>

        {/* Slides */}

        <div className="sectionContent full-width">
          <swiper-container
            ref={swiperElRef}
            navigation="true"
            pagination={pagination}
            modules={[Pagination]}
            slides-per-view="4"
            space-between="30"
          >
            {Array.apply(11, { length: spotlightSlides }).map(
              (value, index) => {
                return (
                  <swiper-slide key={`slide${index}`}>
                    <div className="sliderContent spotlight-slider">
                      <img
                        src={Spotlight}
                        className="spotlight-image"
                        width={150}
                        height={150}
                      />
                      <div className="date">July 10, 2023</div>
                      <a className="spotlight-meta">
                        Creative Director Art, Brant Herzer
                      </a>
                      <div className="watch-link">
                        <a href="#">
                          Watch
                          <IoChevronForwardOutline />
                        </a>
                      </div>
                    </div>
                  </swiper-slide>
                );
              }
            )}
          </swiper-container>
        </div>

        {/* Creative Jobs Section */}
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
            navigation="true"
            pagination={pagination}
            modules={[Pagination]}
            slides-per-view="3"
            space-between="30"
            centeredSlides="true"
          >
            {Array.apply(11, { length: jobSlides }).map((value, index) => {
              return (
                <swiper-slide key={`slide${index}`}>
                  <div className="sliderContent job-slider">
                    <div className="left-badge">
                      <div className="featured">
                        <span>Featured</span>
                      </div>
                    </div>
                    <div className="right-badge">
                      <a href="#">
                        <span>Full-Time</span>
                      </a>
                    </div>
                    <a href="#" className="employer-logo">
                      <img src={Employer} width={150} height={150} />
                    </a>
                    <h3 className="employer-title"><a href="#">David&Goliath</a></h3>
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
          
        <AdAgencies />

        <MentorResources />

        <PublicationResources />

        <FeaturedCities />
      </div>
    </div>
  );
};

export default Home;
