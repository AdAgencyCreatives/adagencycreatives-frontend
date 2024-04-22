import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoPersonAdd,
} from "react-icons/io5";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
import useShortlist from "../../../hooks/useShortlist";

const Header = ({ data, role, user }) => {
  const isAgency = role == "agency";
  const { isShortlisted, shortlistHandler } = useShortlist(
    user?.uuid,
    data.id,
    "agencies"
  );

  console.log('user', user);

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top flex-md-row flex-column">
          <div className="avatar employer">
            <img src={data.logo || Placeholder} height={100} width={100} onError={(e) => { e.target.src = Placeholder; }} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6 px-md-3 px-0">
              <div className="username">{data.name}</div>
              {data.industry_experience.length > 0 && (
                <div className="position">
                  <IoBriefcaseOutline />
                  {data.industry_experience.map((item, index) => (
                    <span key={index}>
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
                    </span>
                  ))}
                </div>
              )}
              {data.location.state && (
                <div className="job-location location">
                  <IoLocationOutline />
                  <Link to={`/agencies/location/state/${data.location.state}`}>
                    {data.location.state}
                  </Link>
                  {(data?.location?.state?.length && data?.location?.city?.length) && (<span>,&nbsp;</span>)}
                  <Link to={`/agencies/location/city/${data.location.city}`}>
                    {data.location.city}
                  </Link>
                </div>
              )}
              <div className="open-jobs">Open Job - {data.open_jobs}</div>
            </div>
            <div className="col-md-6">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0">
                {user && !(isAgency || data?.role == 'advisor' || data?.role == 'recruiter') && (
                  <button
                    className={
                      "btn btn-hover-primary" +
                      (isShortlisted ? " btn-theme" : " btn-dark")
                    }
                    onClick={(e) => shortlistHandler('Agency')}
                  >
                    <IoBookmarkOutline size={25} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
