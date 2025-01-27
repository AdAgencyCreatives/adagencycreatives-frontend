import { useState, useContext, useEffect, useRef } from "react";
import usePageDataHelper from "../hooks/usePageDataHelper";

const About = () => {

  const { pageData, getPageDataItem } = usePageDataHelper("about");

  return (
    <>
      <div className="bg-black p-4"></div>
      <div className="container mt-5 mb-5 about-page">
        <h3 className="text-dark text-center fw-normal">
          <span style={{ fontSize: "36px", fontWeight: "500" }}>About Us</span><br /><br />
        </h3>
        <h3 className="text-dark text-center fw-normal about-text" dangerouslySetInnerHTML={{ __html: getPageDataItem('description', pageData) }}></h3>
      </div>

      {/* <div className="bg-black text-white text-center p-5 mb-3">
        <h3 className="fs-2 fw-normal">We are bringing our industry together</h3>
        <p className="fs-5">to Gather. to Inspire. to do really cool $#*t!</p>
      </div> */}
    </>
  );
};

export default About;
