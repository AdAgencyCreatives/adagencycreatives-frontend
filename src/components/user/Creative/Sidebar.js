import Cookies from "js-cookie";
import {
  IoAdd,
  IoCalendarClearOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import "../../../styles/User/ProfileSidebar.scss";
import adicon from "../../../assets/images/icons/adicon.png";
import bullseye from "../../../assets/images/icons/bulleyes.png";
import time from "../../../assets/images/icons/duration-icon.png";
import star from "../../../assets/images/icons/star_1.png";
import sample from "../../../assets/images/sample.mp4";
import strength from "../../../assets/images/icons/strength.png";
import React, { useContext, useEffect, useState } from "react";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { getMyFriends } from "../../../context/FriendsDataContext";
import { Link } from "react-router-dom";
import useHelper from "../../../hooks/useHelper";

const Sidebar = ({ data, user }) => {

  const { encodeSpecial, decodeSpecial, formatPhone } = useHelper();

  const {
    state: { resume, video },
    getResume,
    getVideo,
  } = useContext(CreativesContext);

  const {
    state: { subscription },
    getSubscriptionStatus,
  } = useContext(AgenciesContext);

  const isCreative = user?.role == "creative";
  const isAdmin = user?.role == "admin";
  const isAdvisor = user?.role == "advisor";
  const isAgency = user?.role == "agency";
  const isRecruiter = user?.role == "recruiter";
  const isOwnProfile = user?.uuid == data.user_id;

  const checkPermissions = () => {
    if (Cookies.get("token")) {
      if (isOwnProfile || isFriend) {
        // check if current profile is the profie of logged in user
        return true;
      } else if (user?.role == "admin" || subscription) {
        return true;
      }
      return false;
    }
    return false;
  };

  const [isFriend, setIsFriend] = useState(false)

  useEffect(() => {
    getMyFriends().then(result => {
      setIsFriend(result.some((item) => item.user.uuid == data.user_id))
    });
  }, [])

  useEffect(() => {
    if (checkPermissions()) getResume(data.user_id);
  }, [user, subscription, isFriend]);

  useEffect(() => {
    if (user?.role == "agency" || user?.role == "advisor" || user?.role == "recruiter") {
      getSubscriptionStatus();
    }
  }, [user]);

  useEffect(() => {
    getVideo(data.user_id);
  }, []);

  const [showAllItems, setShowAllItems] = useState({});

  const renderListData = (list, listKey, isAdmin, isAdvisor, field) => {
    const maxItemsToShow = 5;

    const renderedList = list.slice(0, maxItemsToShow);
    const remainingItems = list.slice(maxItemsToShow);

    const toggleShowAllItems = () => {
      setShowAllItems((prev) => ({
        ...prev,
        [listKey]: !prev[listKey], // Toggle the visibility of the specific list
      }));
    };

    return (
      <>
        {renderedList.map((item, index) => (
          <span key={index}>
            {isAdmin || isAdvisor ? (<>
              <Link to={"/creatives/search/" + field + "/" + encodeSpecial(encodeURI(item))}>
                {(index > 0 ? ', ' : '') + `${item}`}
              </Link>
            </>) : (<>
              {(index > 0 ? ', ' : '') + `${item}`}
            </>)}
          </span>
        ))}
        {list.length > maxItemsToShow && !showAllItems[listKey] && (
          <React.Fragment>
            <IoAdd onClick={toggleShowAllItems} className="cursor-pointer" />
          </React.Fragment>
        )}
        {showAllItems[listKey] &&
          remainingItems.length > 0 &&
          remainingItems.map((item, index) => (
            <span key={index}>
              {isAdmin || isAdvisor ? (<>
                <Link to={"/creatives/search/" + field + "/" + encodeSpecial(encodeURI(item))}>
                  {`, ${item}`}
                </Link>
              </>) : (<>
                {`, ${item}`}
              </>)}
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="sidebar-item">
        <h4 className="title">Creative Details</h4>
        <div className="content">
          {data.years_of_experience !== "" ? (
            <div className="item">
              <IoCalendarClearOutline />
              <div className="details">
                <div className="text">Years of Experience</div>
                <div className="value">
                  {isAdmin || isAdvisor ? (<>
                    <Link to={"/creatives/search/years-of-experience/" + encodeSpecial(encodeURI(data.years_of_experience))}>
                      {data.years_of_experience}
                    </Link>
                  </>) : (<>
                    {data.years_of_experience}
                  </>)}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.email && (isOwnProfile || isAdmin || isAgency || isAdvisor || isFriend) && (
            <div className="item">
              <IoMailOutline size={22} />
              <div className="details">
                <div className="text">Email</div>
                <div className="value">{data.email}</div>
              </div>
            </div>
          )}
          {data.phone_number && (isOwnProfile || isAdmin || isAgency || isAdvisor || isFriend) && (
            <div className="item">
              <IoCallOutline size={22} />
              <div className="details">
                <div className="text">Phone Number</div>
                <div className="value">{formatPhone(data.phone_number)}</div>
              </div>
            </div>
          )}
          {data.industry_experience?.length ? (
            <div className="item">
              <img src={bullseye} height={22} width={22} />
              <div className="details">
                <div className="text">Industry Experience</div>
                <div className="value">
                  {renderListData(data.industry_experience, "i", isAdmin, isAdvisor, 'industry-experience')}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.media_experience?.length ? (
            <div className="item">
              <img src={adicon} height={22} width={22} />
              <div className="details">
                <div className="text">Media Experience</div>
                <div className="value">
                  {renderListData(data.media_experience, "m", isAdmin, isAdvisor, 'media-experience')}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.employment_type && (
            <div className="item">
              <img src={time} height={22} width={22} />
              <div className="details">
                <div className="text">Type of Work</div>
                <div className="value">
                  {renderListData(data.employment_type.split(','), "e", isAdmin, isAdvisor, 'work-type')}
                </div>
              </div>
            </div>
          )}
          {data.character_strengths?.length ? (
            <div className="item">
              <img src={strength} height={22} width={22} />
              <div className="details">
                <div className="text">Strengths</div>
                <div className="value">
                  {renderListData(data.character_strengths, "c", isAdmin, isAdvisor, 'strengths')}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {isOwnProfile || isAdmin ? (
            <Link to="/my-resume">
              <button className="btn btn-dark w-100 py-3 fs-5 mb-3">
                Edit My Resume
              </button>
            </Link>
          ) : ("")}
        </div>
      </div>
      <div className="sidebar-item my-4">
        <h4 className="title">Video</h4>
        {video ? (
          <div className="video-section mt-4">
            <video src={video.url} controls></video>
          </div>
        ) : (
          <button className="btn btn-dark w-100 py-3 fs-5">Coming Soon</button>
        )}
      </div>

      {resume?.length ? (
        <div className="sidebar-item my-4">
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
