import Placeholder from "../../assets/images/placeholder.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { PaginationStyle } from "../../styles/PaginationStyle";
import { Link } from "react-router-dom";
import useCreatives from "../../hooks/useCreatives";
import useHelper from "../../hooks/useHelper";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as AuthContext } from "../../context/AuthContext";
import CreativeLocation from "../../components/CreativeLocation";
import Loader from "../Loader";

const AgencyCreatives = ({ validateAccess }) => {

  const [isLoading, setIsLoading] = useState(true);

  const swiperElRef = useRef(null);
  const { creatives } = useCreatives("home");
  const { encodeSpecial, decodeSpecial } = useHelper();
  const { showAlert } = useContext(AlertContext);
  const {
    state: { token, role, },
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
      on: {
        afterInit: function () {
          window.setTimeout(() => {
            setIsLoading(false);
          }, 500);
        },
      },
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  }, []);

  return (
    <div id="creatives">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Agency Creatives</h1>
        <Link className="browseAll" to="/creatives">
          browse all <MdKeyboardDoubleArrowRight />
        </Link>
      </div>
      {/* Slides */}
      {isLoading ? <Loader fullHeight={false} /> : ""}
      <div className={"sectionContent"}>
        <swiper-container
          ref={swiperElRef}
          init="false"
          navigation="true"
          slides-per-view="1"
          space-between="30"
          loop="true"
          autop
        >
          {creatives && creatives.map((item, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="sliderContent agencies-slider">
                  <img
                    src={item?.user_thumbnail || item.profile_image || Placeholder}
                    className="candidateLogo"
                    width={150}
                    height={150}
                    alt=""
                    onError={(e) => {
                      e.target.src = Placeholder; // Set the backup image source
                    }}
                  />
                  <div className="agencyName">{item.name}</div>
                  <div className="position">
                    {isAdmin || isAdvisor ? (<>
                      <Link to={"/creatives/search/industry-title/" + encodeSpecial(encodeURI(item.category))}>
                        {item.category}
                      </Link>
                    </>) : (<>
                      {item.category}
                    </>)}
                  </div>
                  <CreativeLocation location={item?.location} />
                  <div className="profileLink">
                    <Link
                      to={token ? `/creative/${item.slug}` : "#"}
                      onClick={(e) => {
                        if (!token) {
                          e.preventDefault();
                          showAlert("Please login to access");
                        }
                        return false;
                      }}
                    >
                      View Profile
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

export default AgencyCreatives;
