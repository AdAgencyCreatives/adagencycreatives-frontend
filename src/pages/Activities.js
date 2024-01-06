import Placeholder from "../assets/images/placeholder.jpeg";
import LeftSidebar from "../components/community/LeftSidebar";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../styles/Activities.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { getCreativeById } from "../context/CreativesDataContext";

import { getActivities } from "../context/ActivitiesDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../components/TimeAgo";
import UtcToLocalDateTime from "../components/UtcToLocalDateTime";
import ActivityWidget from "../components/community/ActivityWidget";

const Activities = () => {

  const [activities, setActivities] = useState([]);
  const [creative, setCreative] = useState([]);

  const {
    state: { role, user, token, },
    getActivitiesCount
  } = useContext(AuthContext);

  const getActivitiesAsync = async (user) => {
    let result = await getActivities(user.uuid);
    setActivities(result);
    getActivitiesCount(user.uuid);
  };

  const getCreativeByIdAsync = async (user) => {
    let result = await getCreativeById(user.uuid);
    setCreative(result);
  };

  useEffect(() => {
    if (role && user) {
      getCreativeByIdAsync(user);
      getActivitiesAsync(user);
    }
  }, [user]);

  const loadActivities = () => {
    getActivitiesAsync(user);
  };

  return (
    <div className="dark-container">
      <div className="container-fluid px-2 px-md-5">
        {/* <div className="row">
          <div className="col-12">
            <Header username={username} />
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-2 mb-3">
            <LeftSidebar />
          </div>
          <div className="col-md-10">
            <div className="notif-list">
              {activities && activities.map((activity, index) => {
                return (
                  <ActivityWidget key={"activity-" + activity.id} activity={activity} creative={creative} loadActivities={loadActivities} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
