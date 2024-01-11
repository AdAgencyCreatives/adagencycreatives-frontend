import "../../../styles/User/ProfileSidebar.scss";
import { Link } from "react-router-dom";
import sample from "../../../assets/images/sample.mp4";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/AgenciesContext";
import { IoAdd, IoCallOutline, IoMailOutline } from "react-icons/io5";

import useHelper from "../../../hooks/useHelper";

const Sidebar = ({ data, user }) => {

  const { formatPhone } = useHelper();

  const isCreative = user?.role == "creative";
  const isAdmin = user?.role == "admin";
  const isAdvisor = user?.role == "advisor";
  const isAgency = user?.role == "agency";
  const isRecruiter = user?.role == "recruiter";
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
      <Link
        to={
          "/agency-category/" +
          item.toLowerCase().replace(" ", "-").replace("|", "-")
        }
        className="text-dark"
        key={item}
      >
        {item}
        {!lastIndex && ", "}
      </Link>
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
        {listKey == "industry"
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
            <span key={index}>, {listKey == "industry" ? renderLinkList(item, true) : item}
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="sidebar-item">
        <h4 className="title">Agency Details</h4>
        <div className="content">
          {data.email && (isOwnProfile || isAdmin) && (
            <div className="item">
              <IoMailOutline size={22} />
              <div className="details">
                <div className="text">Email</div>
                <div className="value">{data.email}</div>
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
          {preferences.length ? (
            <div className="mt-4">
              <div className="details">
                <div className="text">Workplace Preference</div>
                <div className="value">{preferences.join(",")}</div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-4">
            {data.industry_experience.length ? (
              <div className="details">
                <div className="text">Industry Specialty:</div>
                <div className="value">
                  {renderListData(data.industry_experience, "industry")}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {data.media_experience.length ? (
            <div className="mt-4">
              <div className="details">
                <div className="text">Media Specialty</div>
                <div className="value">
                  {renderListData(data.media_experience, "m")}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {data.size && (
            <div className="mt-4">
              <div className="details">
                <div className="text">Company Size</div>
                <div className="value">{data.size}</div>
              </div>
            </div>
          )}
          {data.location.state && (
            <div className="mt-4">
              <div className="details">
                <div className="text">Location:</div>
                <div className="value">
                  {data.location && (
                    <div className="job-location location">
                      <Link
                        to={`/agency-location/${data.location.state}`}
                        className="mt-0 fw-normal"
                      >
                        {data.location.state}
                      </Link>
                      {data.location &&
                        data.location.state &&
                        data.location.city ? (
                        <>,&nbsp;</>
                      ) : (
                        <></>
                      )}
                      <Link
                        to={`/agency-location/${data.location.city}`}
                        className="mt-0 fw-normal"
                      >
                        {data.location.city}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {linkedin || website ? (
            <div className="mt-4">
              <div className="details">
                <div className="text mb-3">Agency</div>
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
