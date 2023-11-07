import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useContext, useEffect } from "react";
import { useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Link } from "react-router-dom";
import useCreatives from "../../hooks/useCreatives";

const AgencyCreatives = () => {
  const swiperElRef = useRef(null);
  const {creatives} = useCreatives("home");

  useEffect(() => {
    const params = {
      injectStyles: [PaginationStyle],
      // pagination: {
      //   clickable: true,
      //   renderBullet: function (index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + "</span>";
      //   },
      // },
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
    <div id="creatives">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Agency Creatives</h1>
        <Link className="browseAll" to="/creatives">
          browse all <MdKeyboardDoubleArrowRight />
        </Link>
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
          {creatives &&
            creatives.map((item, index) => {
              return (
                <swiper-slide key={`slide${index}`}>
                  <div className="sliderContent agencies-slider">
                    <img
                      src={item.profile_image || Placeholder}
                      className="candidateLogo"
                      width={150}
                      height={150}
                      alt=""
                      onError={(e) => {
                        e.target.src = Placeholder; // Set the backup image source
                      }}
                    />
                    <div className="agencyName">{item.name}</div>
                    <div className="position">{item.title}</div>
                    {item.location.state && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/creative-location/${item.location.state}`}>{item.location.state},&nbsp;</Link>
                        <Link to={`/creative-location/${item.location.city}`}>{item.location.city}</Link>
                      </div>
                    )}
                    <div className="profileLink">
                      <Link to={`/creative/${item.slug}`}>View Profile</Link>
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

export default AgencyCreatives;
