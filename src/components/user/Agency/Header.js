import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoPersonAdd,
} from "react-icons/io5";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar employer">
            <img src={data.logo || Placeholder} height={100} width={100} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6">
              <div className="username">{data.name}</div>
              {data.industry_experience && (
                <div className="position">
                  <IoBriefcaseOutline />
                  {data.industry_experience.map((item, index) => (
                    <>
                      <Link
                        to={
                          "agency-category/" +
                          item.toLowerCase().replace(" ", "-").replace("|", "-")
                        }
                        className="cat-link"
                      >
                        {item}
                      </Link>
                      {index < data.industry_experience.length - 1 && ","}
                    </>
                  ))}
                </div>
              )}
              {data.location && (
                <div className="job-location location">
                  <IoLocationOutline />
                  <Link to={`/agency-location/${data.location.state}`}>
                    {data.location.state},
                  </Link>
                  <Link to={`/agency-location/${data.location.city}`}>
                    {data.location.city}
                  </Link>
                </div>
              )}
              <div className="open-jobs">Open Job - {data.open_jobs}</div>
            </div>
            <div className="col-md-6">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0">
                <button className="btn btn-dark">
                  <IoBookmarkOutline size={25} />
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
