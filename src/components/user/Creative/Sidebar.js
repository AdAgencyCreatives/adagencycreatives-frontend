import Cookies from "js-cookie";
import { IoCalendarClearOutline } from "react-icons/io5";
import "../../../styles/User/ProfileSidebar.scss";
import adicon from "../../../assets/images/icons/adicon.png";
import bullseye from "../../../assets/images/icons/bulleyes.png";
import time from "../../../assets/images/icons/duration-icon.png";
import sample from "../../../assets/images/sample.mp4";
import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

const Sidebar = ({ data, role, user }) => {
  const {
    state: { resume },
    getResume,
  } = useContext(CreativesContext);

  const {
    state: { subscription },
    getSubscriptionStatus,
  } = useContext(AgenciesContext);

  const checkPermissions = () => {
    if (Cookies.get("token")) {
      if (role == "creative" && user?.uuid == data.user_id) {
        // check if current profile is the profie of logged in user
        return true;
      } else if (role == "admin" || subscription) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (checkPermissions()) getResume(data.user_id);
  }, [user, subscription]);

  useEffect(() => {
    if (user?.role == "agency" || user?.role == "advisor") {
      getSubscriptionStatus();
    }
  }, [user]);

  const renderListData = (list) => {
    return list.slice(0, 5).join(", ") + (list.length > 5 ? " +" : "");
  };
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
              <div className="value">
                {renderListData(data.industry_experience)}
              </div>
            </div>
          </div>
          <div className="item">
            <img src={adicon} height={22} width={22} />
            <div className="details">
              <div className="text">Media Experience</div>
              <div className="value">
                {renderListData(data.media_experience)}
              </div>
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
              <div className="value">
                {renderListData(data.character_strengths)}
              </div>
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

      {resume.length ? (
        <div className="sidebar-item mt-4">
          <h4 className="title">Resume</h4>
          <div className="content">
            {resume.map((item) => (
              <a href={item.url} target="_blank">
                <button className="btn btn-dark w-100 py-3 fs-5 mb-3">
                  Download Resume
                </button>
              </a>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
