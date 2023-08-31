import { FaPencil, FaEarthAmericas, FaRightToBracket } from "react-icons/fa6";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../styles/Groups.scss";
import { Link } from "react-router-dom";
import LeftSidebar from "../components/community/LeftSidebar";

const Groups = () => {
  return (
    <div className="dark-container page-groups">
      <div className="container-fluid px-2 px-md-5">
        <h1 className="display-5 fw-normal mb-5 text-white text-center">
          Groups Directory
        </h1>
        <div className="search-bar">
          <input
            className="search-community-members"
            placeholder="Search by name"
          />
          {/* <button className="clear-btn">Clear</button> */}
        </div>
        <div className="members-header">
          <Link to="create" className="text-dark">
            <div className="members-count">
              <FaPencil color="#a4a4a4" />
              <span className="m-2">Create a Group</span>
              {/* <span className="count-number">340</span> */}
            </div>
          </Link>
        </div>
        <div className="row">
          <div className="col-md-2 mb-3">
            <LeftSidebar />
          </div>
          <div className="col-md-10">
            <div className="row g-4 px-md-1 px-5">
              {Array.apply(null, { length: 5 }).map((value, index) => {
                return (
                  <div className="col-md-4 col-sm-3 col-12" key={`ag-${index}`}>
                    <div className="sliderContent">
                      <img
                        src={Nathan}
                        className="candidateLogo"
                        width={150}
                        height={150}
                      />
                      <div className="agencyName ">Creative Directors</div>
                      <div className="group-info">
                        <FaEarthAmericas color="#a4a4a4" /> Public Group
                      </div>
                      <div className="join-group">
                        <button className="group-btn">
                          <FaRightToBracket /> Join Group{" "}
                        </button>
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

export default Groups;
