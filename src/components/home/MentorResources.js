import AdAgency from "../../assets/images/AdAgency.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { Context } from "../../context/DataContext";
import { useContext, useEffect, useRef } from "react";
import { BulletStyle, ResourcePaginationStyle } from "../../styles/PaginationStyle";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const MentorResources = () => {
  const {
    state: { mentors },
    getMentorTopics
  } = useContext(Context);

  const swiperElRef = useRef(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    getMentorTopics('', 6);
  }, []);

  useEffect(() => {
    if (width <= 991) {
      const params = {
        injectStyles: [ResourcePaginationStyle + BulletStyle],
  
        pagination: {
          clickable: true,
          // renderBullet: function (index, className) {
          //   return '<span class="' + className + '">' + (index + 1) + "</span>";
          // },
        },
        breakpoints: {
          500: {
            slidesPerView: 2
            // spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          }
        },
      };
      Object.assign(swiperElRef.current, params);
      swiperElRef.current.initialize();
    }
  });

  return (
    <div id="mentors" className={`${width <= 991 ? 'home-resources' : ''}`}>
      <div className="sectionHeader">
        <h1 className="sectionTitle">Resources</h1>
        <div>
          <Link className="browseAll" to="mentoring-resources">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>

      <div className="sectionContent mentors-section">
        {(width <= 991) ? (
          <>
            <swiper-container
              ref={swiperElRef}
              init="false"
              navigation="true"
              slides-per-view="1"
              space-between="10"
              loop="true"
            >
              {mentors.map((item, index) => {
                return (
                  <swiper-slide key={`slide${index}`}>
                    <Link to={`/mentoring-resources/${item.slug}`} className="mentor" key={`m_${index}`}>
                      <span>{item.title}</span>
                      <img src={AdAgency} height={150} width={150} alt="" />
                    </Link>
                  </swiper-slide>
                );
              })}
            </swiper-container>
          </>
        ) : (
          <>
            {mentors.map((item, index) => {
              return (
                <Link to={`/mentoring-resources/${item.slug}`} className="mentor" key={`m_${index}`}>
                  <span>{item.title}</span>
                  <img src={AdAgency} height={150} width={150} alt="" />
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MentorResources;
