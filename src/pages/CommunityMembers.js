import { IoEarth, IoLocationOutline } from "react-icons/io5";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../styles/CommunityMembers.css";
import { Link } from "react-router-dom";
import LeftSidebar from "../components/community/LeftSidebar";

const CommunityMembers = () => {
  return (
    <div className="dark-container page-community-members">
      <div className="container-fluid">
        <h1 className="display-5 fw-normal mb-5 text-white text-center">
          Creatives Directory
        </h1>
        <div className="search-bar">
          <input
            className="search-community-members"
            placeholder="Search by name"
          />
          <button className="clear-btn">Clear</button>
        </div>
        {/* <div className="members-header">
          <Link to="" className="text-dark">
            <div className="members-count">
              <IoEarth color="#a4a4a4" />
              <span>All Members</span>
              <span className="count-number">340</span>
            </div>
          </Link>
        </div> */}
        <div className="row">
          <div className="col-md-2 mb-3">
            <LeftSidebar />
          </div>
          <div className="col-md-10">
            <div className="row g-4 px-md-1 px-5">
              {Array.apply(11, { length: 10 }).map((value, index) => {
                return (
                  <div className="col-md-4 col-sm-3 col-12" key={`ag-${index}`}>
                    <div className="sliderContent">
                      <img
                        src={Nathan}
                        className="candidateLogo"
                        width={150}
                        height={150}
                      />
                      <div className="agencyName">Uriel Sanchez</div>
                      <div className="job-location location">
                        <IoLocationOutline />
                        <a href="#">Austin,</a>
                        <a href="#">Texas</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMembers;
