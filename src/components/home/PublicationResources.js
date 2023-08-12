import AgencySpy from "../../assets/images/AgencySpy.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { BulletStyle, PaginationStyle } from "../../styles/PaginationStyle";

const PublicationResources = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const params = {
      injectStyles: [
        PaginationStyle +
          `
      :host{
        --swiper-navigation-sides-offset: 0px;
      }
      .swiper-button-prev,.swiper-button-next{
        background-color:#d9d9d9;
        width: 45px;
        height: 45px;
      }
      .swiper-button-prev svg,.swiper-button-next svg{
        height: 15px;
        stroke-width: 2px;
        stroke: black;
      }
      .swiper-button-next:hover,.swiper-button-prev:hover {
        background:#d9d9d9;
        opacity:1;
      }
      ` +
          BulletStyle,
      ],
      pagination: {
        clickable: true,
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
      },
      breakpoints: {
        500: {
          slidesPerView: 3,
          // spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
        },
      },
      on: {
        init: function () {
          // do something
        },
      },
    };
    Object.assign(swiperElRef.current, params);

    swiperElRef.current.initialize();
  });

  const publications = [
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
  ];

  return (
    <>
      <div className="sectionHeader">
        <h1 className="sectionTitle">Publication Resources</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      {/* Slides */}
      <div className="sectionContent publication-section">
        <swiper-container
          navigation="true"
          slides-per-view="1"
          // free-mode="true"
          space-between="10"
          ref={swiperElRef}
          init="false"
          loop="true"
        >
          {publications.map((item, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="publications-slider">
                  <a href={item.url}>
                    <img
                      src={item.image}
                      className="publication-image w-100 h-auto"
                      width={150}
                      height={150}
                    />
                  </a>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </>
  );
};

export default PublicationResources;
