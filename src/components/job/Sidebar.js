import {
  IoCalendarClearOutline,
  IoHourglassOutline,
  IoLocationOutline,
} from "react-icons/io5";
import "../../styles/User/ProfileSidebar.scss";
import bullseye from "../../assets/images/icons/bulleyes.png";
import { FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="content">
        <div className="item">
          <IoCalendarClearOutline />
          <div className="details">
            <div className="text">Date Posted</div>
            <div className="value">September 7, 2023</div>
          </div>
        </div>
        <div className="item">
          <IoLocationOutline />
          <div className="details">
            <div className="text">Job Location</div>
            <div className="value">
              <Link to="#" className="text-dark">Austin, Texas</Link>
            </div>
          </div>
        </div>
        <div className="item">
          <IoHourglassOutline />
          <div className="details">
            <div className="text">Expiration date</div>
            <div className="value">October 22, 2023</div>
          </div>
        </div>
        <div className="item">
          <FaUserTie />
          <div className="details">
            <div className="text">Years Experience</div>
            <div className="value">Senior 5-10 years</div>
          </div>
        </div>
        <div className="item">
          <img src={bullseye} height={22} width={22} />
          <div className="details">
            <div className="text">Industry Experience</div>
            <div className="value">
              Automotive and Transportation, Beverage | Spirits, Digital |
              Social, Traditional Agency
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
