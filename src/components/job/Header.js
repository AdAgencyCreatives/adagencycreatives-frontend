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
import moment from "moment";

const Header = ({ data }) => {
  console.log({ data });
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar employer">
            <img src={data.agency.logo} height={100} width={100} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-8">
              <div className="username">{data.title}</div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <div className="position meta-item">
                  <IoBriefcaseOutline />
                  <Link
                    to={
                      "/job-category/" +
                      data.category.toLowerCase().replace(" ", "-")
                    }
                    className="cat-link"
                  >
                    {data.category}
                  </Link>
                </div>
                {data.location && (
                  <div className="job-location meta-item">
                    <IoLocationOutline />
                    <Link
                      className="text-black"
                      to={`/job-location/${data.location.state}`}
                    >
                      {data.location.state},
                    </Link>
                    <Link
                      className="text-black"
                      to={`/job-location/${data.location.city}`}
                    >
                      {data.location.city}
                    </Link>
                  </div>
                )}
                <div className="job-post-time meta-item d-flex align-items-center gap-1">
                  <IoTimeOutline />
                  {moment(data.expired_at).format("MMMM D, YYYY")}
                </div>
              </div>
              <div className="tags">
                <div className="badge">
                  <Link
                    className="link-light"
                    to={"/job-type/" + data.employment_type}
                  >
                    {data.employment_type}
                  </Link>
                </div>
                {Object.keys(data.priority).map((key) => {
                  if (data.priority[key]) {
                    let parts = key.split("_");
                    let type = parts[1];
                    return (
                      <Tooltip title={type} type={type}>
                        <button className="btn p-0 border-0">
                          <IoStar
                            size={20}
                            className={"icon-rounded star-badge " + type}
                          />
                        </button>
                      </Tooltip>
                    );
                  }
                })}
                {Object.keys(data.workplace_preference).map((key) => {
                  if (data.workplace_preference[key]) {
                    let parts = key.split("_");
                    let type = parts[1];
                    return (
                      <Tooltip title={type} type={type}>
                        <button className="btn p-0 border-0">
                          <IoStar
                            size={20}
                            className={"icon-rounded star-badge " + type}
                          />
                        </button>
                      </Tooltip>
                    );
                  }
                })}

                {/* <Tooltip title="Featured" type="featured">
                  <button className="btn p-0 border-0">
                    <IoStar
                      size={20}
                      className="icon-rounded star-badge featured"
                    />
                  </button>
                </Tooltip>
                <Tooltip title="Urgent" type="urgent">
                  <button className="btn p-0 border-0">
                    <IoStar
                      size={20}
                      className="icon-rounded star-badge urgent"
                    />
                  </button>
                </Tooltip> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0">
                <Link
                  to={data.external_link}
                  className="btn btn-dark btn-hover-primary px-5 py-3"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
