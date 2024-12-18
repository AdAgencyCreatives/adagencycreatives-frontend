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
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { getMyFriends } from "../../../context/FriendsDataContext";
import { Link } from "react-router-dom";
import useHelper from "../../../hooks/useHelper";

import moment from "moment";
import { saveAs } from 'file-saver';
import { CircularProgress } from "@mui/material";

const Sidebar = ({ data, user, showButtons = true }) => {

  const { encodeSpecial, decodeSpecial, formatPhone } = useHelper();
  const { showAlert } = useContext(AlertContext);

  const {
    state: { token, subscription_status },
  } = useContext(AuthContext);

  const {
    state: { resume, video },
    getResume,
    getVideo,
  } = useContext(CreativesContext);

  const {
    state: { subscription, },
    getSubscriptionStatus, isCreativeApplicant,
  } = useContext(AgenciesContext);

  const isCreative = user?.role == "creative";
  const isAdmin = user?.role == "admin";
  const isAdvisor = user?.role == "advisor";
  const isAgency = user?.role == "agency";
  const isRecruiter = user?.role == "recruiter";
  const isOwnProfile = user?.uuid == data.user_id;

  const [hasSubscription, setSubscription] = useState(false);
  const [hasCreativeApplications, setHasCreativeApplications] = useState(false);
  const [isDownloading, setDownloading] = useState(false);

  useEffect(() => {
    setSubscription(subscription_status == "active");
    console.log(subscription_status);
  }, [subscription_status]);

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

  const validateAccess = (e, permissions, message) => {
    if (permissions.length > 0) {
      console.log(permissions);
      let pass = permissions.every((value) => value === true);
      if (pass) {
        showAlert(message);
        e.preventDefault();
        return false;
      }
    }
    return true;
  };

  const [isFriend, setIsFriend] = useState(false)

  useEffect(() => {
    getMyFriends().then(result => {
      setIsFriend(result.some((item) => item.user.uuid == data.user_id))
    });
  }, []);

  useEffect(() => {
    if (user?.uuid?.length > 0 && data?.user_id?.length > 0)
      isCreativeApplicant(user.uuid, data.user_id, (data) => {
        setHasCreativeApplications(data);
      });
  }, [user, data]);

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
              <Link to={"/creatives/search/" + field + "/" + encodeSpecial(encodeURI(item))}
                onClick={(e) => {
                  if (!token) {
                    e.preventDefault();
                    showAlert("Please login to access");
                    return false;
                  }
                  if (isAdvisor && subscription_status != "active") {
                    e.preventDefault();
                    showAlert("Post a Job for advance search capabilities");
                    return false;
                  }
                  return true;
                }}
              >
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
                <Link to={"/creatives/search/" + field + "/" + encodeSpecial(encodeURI(item))}
                  onClick={(e) => {
                    if (!token) {
                      e.preventDefault();
                      showAlert("Please login to access");
                      return false;
                    }
                    if (isAdvisor && subscription_status != "active") {
                      e.preventDefault();
                      showAlert("Post a Job for advance search capabilities");
                      return false;
                    }
                    return true;
                  }}
                >
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


  const getClientDateTime = () => {
    return moment(new Date()).format("YYYY-MM-DD");
  };

  const getDownloadFilename = () => {
    return (data.name).replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime();
  }

  const downloadResume = async (url) => {
    setDownloading(true);
    try {
      if (url.indexOf("/download/resume?name=") > 0) {
        const resume_name = (new URLSearchParams(url.substring(url.indexOf("?")))).get('name');
        let newUrl = url.replace(resume_name, getDownloadFilename());
        setDownloading(false);
        window.open(newUrl);
      } else {
        const extension = url.lastIndexOf(".") > 0 ? url.substring(url.lastIndexOf(".")) : '';
        const fileName = getDownloadFilename() + extension;
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            setDownloading(false);
            saveAs(blob, fileName);
          })
          .catch((error) => {
            setDownloading(false);
            console.log(error);
            showAlert(error?.message || "Sorry, an error occurred");
          });
      }
    } catch (error) {
      setDownloading(false);
      console.log(error);
      showAlert(error?.message || "Sorry, an error occurred");
    }
  };

  const is_available_years_of_experience = isOwnProfile ? true : (data?.years_of_experience?.length > 0);
  const is_available_email = isOwnProfile ? true : (data?.email?.length > 0 && (isAdmin || ((isAgency || isAdvisor || isRecruiter) && (subscription_status == "active" || hasCreativeApplications)) || isFriend));
  const is_available_phone = isOwnProfile ? true : (data?.phone_number?.length > 0 && (isAdmin || ((isAgency || isAdvisor || isRecruiter) && (subscription_status == "active" && hasCreativeApplications))));
  const is_available_industry_experience = isOwnProfile ? true : (data?.industry_experience?.length > 0);
  const is_available_media_experience = isOwnProfile ? true : (data?.media_experience?.length > 0);
  const is_available_employment_type = isOwnProfile ? true : (data?.employment_type?.length > 0 && data?.employment_type[0]?.length > 0);
  const is_available_character_strengths = isOwnProfile ? true : (data?.character_strengths?.length > 0);

  const is_available_creative_detail = isOwnProfile ? true : (is_available_years_of_experience || is_available_email || is_available_phone || is_available_industry_experience || is_available_media_experience || is_available_employment_type || is_available_character_strengths);

  return (
    <>
      {is_available_creative_detail && (
        <div className="sidebar-item">
          <h4 className="title">Creative Details</h4>
          <div className="content">
            {is_available_years_of_experience && (
              <div className="item">
                <IoCalendarClearOutline />
                <div className="details">
                  <div className="text">Years of Experience</div>
                  <div className="value">
                    {data?.years_of_experience?.length > 0 && (<>
                      {isAdmin || isAdvisor ? (<>
                        <Link to={"/creatives/search/years-of-experience/" + encodeSpecial(encodeURI(data.years_of_experience))}
                          onClick={(e) => {
                            if (!token) {
                              e.preventDefault();
                              showAlert("Please login to access");
                              return false;
                            }
                            if (isAdvisor && subscription_status != "active") {
                              e.preventDefault();
                              showAlert("Post a Job for advance search capabilities");
                              return false;
                            }
                            return true;
                          }}
                        >
                          {data.years_of_experience}
                        </Link>
                      </>) : (<>
                        {data.years_of_experience}
                      </>)}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_email && (
              <div className="item">
                <IoMailOutline size={22} />
                <div className="details">
                  <div className="text">Email</div>
                  <div className="value" style={{ wordBreak: 'break-word' }}>
                    {data?.email?.length > 0 && (<>
                      {data.email}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_phone && (
              <div className="item">
                <IoCallOutline size={22} />
                <div className="details">
                  <div className="text">Phone Number</div>
                  <div className="value">
                    {data?.phone_number?.length > 0 && (<>
                      {formatPhone(data.phone_number)}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_industry_experience && (
              <div className="item">
                <img src={bullseye} height={22} width={22} />
                <div className="details">
                  <div className="text">Industry Experience</div>
                  <div className="value">
                    {data?.industry_experience?.length > 0 && (<>
                      {renderListData(data.industry_experience, "i", isAdmin, isAdvisor, 'industry-experience')}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_media_experience && (
              <div className="item">
                <img src={adicon} height={22} width={22} />
                <div className="details">
                  <div className="text">Media Experience</div>
                  <div className="value">
                    {data?.media_experience?.length > 0 && (<>
                      {renderListData(data.media_experience, "m", isAdmin, isAdvisor, 'media-experience')}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_employment_type && (
              <div className="item">
                <img src={time} height={22} width={22} />
                <div className="details">
                  <div className="text">Type of Work</div>
                  <div className="value">
                    {data?.employment_type?.length > 0 && data?.employment_type[0]?.length > 0 && (<>
                      {renderListData(String(data.employment_type).split(','), "e", isAdmin, isAdvisor, 'work-type')}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {is_available_character_strengths && (
              <div className="item">
                <img src={strength} height={22} width={22} />
                <div className="details">
                  <div className="text">Strengths</div>
                  <div className="value">
                    {data?.character_strengths?.length > 0 && (<>
                      {renderListData(data.character_strengths, "c", isAdmin, isAdvisor, 'strengths')}
                    </>)}
                  </div>
                </div>
              </div>
            )}
            {showButtons && (<>
              {isOwnProfile || isAdmin ? (
                <Link to="/my-resume">
                  <button className="btn btn-dark w-100 py-3 fs-5 mb-3">
                    Edit My Resume
                  </button>
                </Link>
              ) : ("")}
            </>)}
          </div>
        </div>
      )}
      {video?.url?.length > 0 && (
        <div className="sidebar-item my-4">
          <h4 className="title">Video</h4>
          {video ? (
            <div className="video-section mt-4">
              <video src={video.url} controls></video>
            </div>
          ) : (
            <>
              {showButtons && (<button className="btn btn-dark w-100 py-3 fs-5">Coming Soon</button>)}
            </>
          )}
        </div>
      )}
      {showButtons && (<>
        {resume?.length > 0 ? (
          <div className="sidebar-item my-4">
            <h4 className="title">Resume</h4>
            <div className="content">
              {resume.map((item) => (
                <>
                  {isDownloading && (<CircularProgress style={{ minWidth: "40px", minHeight: "40px" }} />)}
                  <a
                    href={"javascript:void(0)"}
                    onClick={(e) => isDownloading ? showAlert("Please wait. Download in progress, or refresh page") : downloadResume(item.url)}>
                    <button
                      className={"btn btn-dark w-100 py-3 fs-5 mb-3" + (isDownloading ? " disabled" : "")}
                      onClick={(e) => isAdmin || (isAdvisor && hasSubscription) ||
                        validateAccess(
                          e,
                          [!hasSubscription, !isCreative],
                          "Post a Job to download resumes"
                        )
                      }
                    >
                      Download Resume
                    </button>
                  </a>
                </>
              ))}
            </div >
          </div>
        ) : (
          ""
        )}
      </>)}

    </>
  );
};

export default Sidebar;
