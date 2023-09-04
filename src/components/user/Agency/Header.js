import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoPersonAdd,
} from "react-icons/io5";
import ppk from "../../../assets/images/ppk.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-md-6 d-flex align-items-center">
          <div className="avatar employer">
            <img src={ppk} />
          </div>
          <div className="meta">
            <div className="username">PPK</div>
            <div className="position">
              <IoBriefcaseOutline />
              <Link to="agency-category/design" className="cat-link">
                Design | Branding
              </Link>
              ,
              <Link to="agency-category/social" className="cat-link">
                Social | Digital
              </Link>
            </div>
            <div className="job-location location">
              <IoLocationOutline />
              <a href="#">Los Angeles,</a>
              <a href="#">California</a>
            </div>
            <div className="open-jobs">Open Job - 1</div>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <div className="actions">
            <button className="btn btn-dark">
              <IoBookmarkOutline size={25}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
