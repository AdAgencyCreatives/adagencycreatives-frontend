import "../../../styles/User/ProfileSidebar.scss";
import { Link } from "react-router-dom";
import adicon from "../../../assets/images/icons/adicon.png";
import bullseye from "../../../assets/images/icons/bulleyes.png";
import time from "../../../assets/images/icons/duration-icon.png";
import sample from "../../../assets/images/sample.mp4";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/AgenciesContext";
import { IoAdd, IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { VscTextSize } from "react-icons/vsc";
import { MdHomeWork } from "react-icons/md";

import useHelper from "../../../hooks/useHelper";
import usePermissions from "../../../hooks/usePermissions";

const Sidebar = ({ data, user }) => {

  const agencyType = (data?.role == 'advisor' ? 'Advisor' : (data?.role == 'recruiter' ? 'Recruiter' : 'Agency'));

  const { encodeSpecial, decodeSpecial, formatPhone } = useHelper();

  const {
    isAdmin,
    isAdvisor,
    isAgency,
    isCreative,
    isRecruiter,
    hasSubscription,
  } = usePermissions();

  const isOwnProfile = user?.uuid == data.user_id;

  const workplacePreference = data.workplace_preference;
  const linkedin = data.links.find((link) => link.label == "linkedin")?.url;
  const website = data.links.find((link) => link.label == "website")?.url;
  const preferences = [];
  const {
    state: { video },
    getVideo,
  } = useContext(Context);

  useEffect(() => {
    getVideo(data.user_id);
  }, []);

  if (workplacePreference.is_remote) {
    preferences.push("Remote");
  }
  if (workplacePreference.is_hybrid) {
    preferences.push("Hybrid");
  }
  if (workplacePreference.is_onsite) {
    preferences.push("Onsite");
  }

  const [showAllItems, setShowAllItems] = useState({});

  const renderLinkList = (item, lastIndex) => {
    return (
      // <Link
      //   to={
      //     "/agency-category/" +
      //     item.toLowerCase().replace(" ", "-").replace("|", "-")
      //   }
      //   className="text-dark"
      //   key={item}
      // >
      //   {item}
      //   {!lastIndex && ", "}
      // </Link>
      <>{item}{!lastIndex && ", "}</>
    );
  };

  const renderListData = (list, listKey) => {
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
        {listKey == "key"
          ? renderedList.map((item, index) =>
            renderLinkList(item, index == renderedList.length - 1)
          )
          : renderedList.join(", ")}
        {list.length > maxItemsToShow && !showAllItems[listKey] && (
          <React.Fragment>
            <IoAdd onClick={toggleShowAllItems} className="cursor-pointer" />
          </React.Fragment>
        )}
        {showAllItems[listKey] &&
          remainingItems.length > 0 &&
          remainingItems.map((item, index) => (
            <span key={index}>, {listKey == "key" ? renderLinkList(item, true) : item}
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="sidebar-item">
        <h4 className="title">{agencyType} Details</h4>
        <div className="content">
          {data.email && (isOwnProfile || isAdmin) && (
            <div className="item">
              <IoMailOutline size={22} />
              <div className="details">
                <div className="text">Email</div>
                <div className="value" style={{ wordBreak: 'break-word' }}>{data.email}</div>
              </div>
            </div>
          )}
          {data.phone_number && (isOwnProfile || isAdmin) && (
            <div className="item">
              <IoCallOutline size={22} />
              <div className="details">
                <div className="text">Phone Number</div>
                <div className="value">{formatPhone(data.phone_number)}</div>
              </div>
            </div>
          )}
          {preferences?.length > 0 ? (
            <div className="item mt-4">
              <MdHomeWork />
              <div className="details">
                <div className="text">Workplace Preference</div>
                <div className="value">
                  {isAdmin || isAdvisor ? (<>
                    {preferences.map((item, index) => {
                      const workplace = item === 'Onsite' ? 'on site' : item.toLowerCase();
                      return (
                        <span>
                        <Link to={"/agencies/search/workplace-preference/" + encodeSpecial(encodeURI(workplace))}
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
                          {item}
                        </Link>
                        {index < preferences.length - 1 && ', '}
                        </span>
                      )
                    })}
                  </>) : (<>
                    {preferences.join(", ")}
                  </>)}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data?.industry_experience?.length > 0 ? (
            <div className="item mt-4">
              <img src={bullseye} height={22} width={22} alt="" />
              <div className="details">
                <div className="text">Industry Specialty</div>
                <div className="value">
                  {isAdmin || isAdvisor ? (<>
                    {data.industry_experience.map((item, index) => {
                      return (
                        <span>
                        <Link to={"/agencies/search/industry-experience/" + encodeSpecial(encodeURI(item))}
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
                          {item}
                        </Link>
                        {index < data.industry_experience.length - 1 && ', '}
                        </span>
                      )
                    })}
                  </>) : (<>
                    {renderListData(data.industry_experience, "i")}
                  </>)}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data?.media_experience?.length > 0 ? (
            <div className="item mt-4">
              <img src={adicon} height={22} width={22} alt="" />
              <div className="details">
                <div className="text">Media Specialty</div>
                <div className="value">
                  {isAdmin || isAdvisor ? (<>
                    {data.media_experience.map((item, index) => {
                      return (
                        <span>
                        <Link to={"/agencies/search/media-experience/" + encodeSpecial(encodeURI(item))}
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
                          {item}
                        </Link>
                        {index < data.media_experience.length - 1 && ', '}
                        </span>
                      )
                    })}
                  </>) : (<>
                    {renderListData(data.media_experience, "m")}
                  </>)}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.size && (
            <div className="item mt-4">
              <VscTextSize />
              <div className="details">
                <div className="text">Company Size</div>
                <div className="value">
                  {isAdmin || isAdvisor ? (<>
                    <Link to={"/agencies/search/company-size/" + encodeSpecial(encodeURI(data.size))}
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
                      {data.size}
                    </Link>
                  </>) : (<>
                    {data.size}
                  </>)}
                </div>
              </div>
            </div>
          )}
          {data.location.state && (
            <div className="item mt-4">
              <IoLocationOutline />
              <div className="details">
                <div className="text">Location</div>
                <div className="value">
                  {data.location && (
                    <div className="job-location location">
                      {isAdmin || isAdvisor ? (
                        <Link 
                          to={`/agencies/location/state/${data.location.state}`} 
                          className="mt-0 fw-normal"
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
                          {data.location.state}
                        </Link>
                      ) : (
                        <span>{data.location.state}</span>
                      )}
                      {(data?.location?.state?.length && data?.location?.city?.length) && (<span>,&nbsp;</span>)}
                      {isAdmin || isAdvisor ? (
                        <Link 
                          to={`/agencies/location/city/${data.location.city}`} 
                          className="mt-0 fw-normal"
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
                          {data.location.city}
                        </Link>
                      ) : (
                        <span>{data.location.city}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {linkedin || website ? (
            <div className="mt-4">
              <div className="details">
                <div className="text mb-3">{agencyType}</div>
                <div className="value d-flex flex-wrap gap-3">
                  {linkedin && (
                    <Link
                      className="text-light fs-5 btn btn-dark w-100 py-3"
                      to={linkedin}
                      target="_blank"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {website && (
                    <Link
                      className="text-light fs-5 btn btn-dark w-100 py-3"
                      to={website}
                      target="_blank"
                    >
                      Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
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
    </>
  );
};

export default Sidebar;
