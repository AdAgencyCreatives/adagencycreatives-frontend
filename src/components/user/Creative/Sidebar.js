import { IoCalendarClearOutline } from "react-icons/io5";
import "../../../styles/User/ProfileSidebar.scss";
import adicon from "../../../assets/images/icons/adicon.png";
import bullseye from "../../../assets/images/icons/bulleyes.png";
import time from "../../../assets/images/icons/duration-icon.png";
import sample from "../../../assets/images/sample.mp4";

const Sidebar = ({ data }) => {
  return (
    <>
      <div className="sidebar-item">
        <h4 className="title">Creative Details</h4>
        <div className="content">
          <div className="item">
            <IoCalendarClearOutline />
            <div className="details">
              <div className="text">Years of Experience</div>
              <div className="value">{data.years_of_experience}</div>
            </div>
          </div>
          <div className="item">
            <img src={bullseye} height={22} width={22} />
            <div className="details">
              <div className="text">Industry Experience</div>
              <div className="value">{data.industry_experience.join(", ")}</div>
            </div>
          </div>
          <div className="item">
            <img src={adicon} height={22} width={22} />
            <div className="details">
              <div className="text">Media Experience</div>
              <div className="value">{data.media_experience.join(", ")}</div>
            </div>
          </div>
          <div className="item">
            <img src={time} height={22} width={22} />
            <div className="details">
              <div className="text">Type of Work</div>
              <div className="value">{data.employment_type}</div>
            </div>
          </div>
          <div className="item">
            <img src={time} height={22} width={22} />
            <div className="details">
              <div className="text">Strengths</div>
              <div className="value">{data.character_strengths.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-item mt-4">
        <h4 className="title">Video</h4>
        {data.video ? (
          <div className="video-section mt-4">
            <video src={sample} controls></video>
          </div>
        ) : (
          <button className="btn btn-dark w-100 py-3 fs-5">Coming Soon</button>
        )}
      </div>
      <div className="sidebar-item mt-4">
        <h4 className="title">Resume</h4>
        <div className="content">
          <button className="btn btn-dark w-100 py-3 fs-5">
            <a
              className="text-light"
              href="https://www.linkedin.com/company/uniteppk/"
              target="_blank"
            >
              Download Resume
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
