import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoPersonAdd,
  IoStar,
  IoTimeOutline,
} from "react-icons/io5";
import jobLogo from "../../assets/images/job.png";
import "../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
import Tooltip from "../Tooltip";

const Header = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar employer">
            <img src={jobLogo} height={100} width={100} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-8">
              <div className="username">Senior Art Director</div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <div className="position meta-item">
                  <IoBriefcaseOutline />
                  <Link
                    to="job-category/senior-art-director"
                    className="cat-link"
                  >
                    Senior Art Director
                  </Link>
                </div>
                <div className="job-location meta-item">
                  <IoLocationOutline />
                  <a href="#" className="text-black">
                    Los Angeles,
                  </a>
                  <a href="#" className="text-black">
                    California
                  </a>
                </div>
                <div className="job-post-time meta-item d-flex align-items-center gap-1">
                  <IoTimeOutline />
                  September 7, 2023
                </div>
              </div>
              <div className="tags">
                <div className="badge">Full-Time</div>
                <Tooltip title="Featured" type="featured">
                  <button className="btn p-0 border-0">
                    <IoStar size={20} className="icon-rounded star-badge featured" />
                  </button>
                </Tooltip>
                <Tooltip title="Urgent" type="urgent">
                  <button className="btn p-0 border-0">
                    <IoStar size={20} className="icon-rounded star-badge urgent" />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="col-md-4">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0">
                <button className="btn btn-dark btn-hover-primary px-5 py-3">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
