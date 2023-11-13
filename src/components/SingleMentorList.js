import { IoArrowForward } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useState } from "react";

const SingleMentorList = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (e, img, index) => {
    console.log(!img)
    if (index != activeIndex && img) {
      e.preventDefault();
    }
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="row content gy-3">
      {items.map((item, index) => (
        <div className="col-lg-3 col-md-4 col-12">
          <Link
            // className={`box link-light ${item.img ? "flip" : ""}`}
            className={`box link-light ${
              activeIndex === index ? "active" : ""
            } ${item.img ? "flip" : ""}`}
            onClick={(e) => handleItemClick(e, item.img, index)}
            to={item.url}
            target="__blank"
          >
            <div className="flip-card-front">
              <div className="main-title">{item.title}</div>
              <div className="title-small">{item.subtitle}</div>
              <div className="box-link">
                <div className="link">
                  <IoArrowForward />
                </div>
              </div>
            </div>
            {item.img && (
              <div className="flip-card-back">
                <img src={item.img} alt="Avatar" />
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SingleMentorList;
