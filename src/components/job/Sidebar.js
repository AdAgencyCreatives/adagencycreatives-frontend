import {
  IoCalendarClearOutline,
  IoHourglassOutline,
  IoLocationOutline,
} from "react-icons/io5";
import "../../styles/User/ProfileSidebar.scss";
import bullseye from "../../assets/images/icons/bulleyes.png";
import adicon from "../../assets/images/icons/adicon.png";
import { FaUserTie, FaDollarSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";

const Sidebar = ({ data, role }) => {
  return (
    <div className="sidebar-item">
      <div className="content">
        <div className="item">
          <IoCalendarClearOutline />
          <div className="details">
            <div className="text">Date Posted</div>
            <div className="value">
              {moment(data.created_at).format("MMMM D, YYYY")}
            </div>
          </div>
        </div>
        <div className="item">
          <IoLocationOutline />
          <div className="details">
            <div className="text">Job Location</div>
            <div className="value">
              {role?.length > 0 ? (
                <Link className="text-dark" to={`/job-location-state/${data.location.state}`}>
                  {data.location.state}
                </Link>
              ) : (
                <span>{data.location.state}</span>
              )}
              {(data?.location?.state?.length > 0 && data?.location?.city?.length > 0) && (<span>,&nbsp;</span>)}
              {role?.length > 0 ? (
                <Link className="text-dark" to={`/job-location-city/${data.location.city}`}>
                  {data.location.city}
                </Link>
              ) : (
                <span>{data.location.city}</span>
              )}
            </div>
          </div>
        </div>
        <div className="item">
          <IoHourglassOutline />
          <div className="details">
            <div className="text">Expiration date</div>
            <div className="value">
              {moment(data.expired_at).format("MMMM D, YYYY")}
            </div>
          </div>
        </div>
        <div className="item">
          <FaUserTie />
          <div className="details">
            <div className="text">Years Experience</div>
            <div className="value">{data.experience}</div>
          </div>
        </div>
        {data?.industry_experience?.length > 0 ? (
          <div className="item">
            <img src={bullseye} height={22} width={22} />
            <div className="details">
              <div className="text">Industry Experience</div>
              <div className="value">
                {data.industry_experience.join(", ")}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {data.media_experience?.length > 0 && (
          <div className="item">
            <img src={adicon} height={22} width={22} />
            <div className="details">
              <div className="text">Media Experience</div>
              <div className="value">
                {data.media_experience?.join(", ") ?? ''}
              </div>
            </div>
          </div>
        )}
        {data.salary_range?.length > 0 && (
          <div className="item">
            <FaDollarSign size={22} />
            <div className="details">
              <div className="text">This Opportunity Pays</div>
              <div className="value">
                {data.salary_range}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
