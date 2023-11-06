import { IoBriefcaseOutline, IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Tooltip from "../../components/Tooltip";
import moment from "moment";
import Placeholder from "../../assets/images/placeholder.png";

const JobList = ({ data, showAgency = true }) => {
  return (
    <div className="jobs-list-container">
      {data.map((item) => (
        <div className="job-item" key={item.id}>
          <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
            <div className="inner-left">
              <div className="employer-logo">
                <Link to={"/job/" + item.slug}>
                  <img
                    width="150"
                    height="150"
                    src={item.agency.logo || Placeholder}
                    className=""
                    alt=""
                  />
                </Link>
              </div>
              <div className="meta row w-100 align-items-center">
                <div className="job-list-content col-md-8">
                  <div className="title-wrapper flex-middle-sm">
                    {showAgency && (
                      <h5 className="employer-name mb-0">
                        <Link
                          className="link-dark"
                          to={"/agency/" + item.agency.slug}
                        >
                          {item.agency.name}
                        </Link>
                      </h5>
                    )}
                    <h2 className="job-title">
                      <Link to={"/job/" + item.slug}>{item.title}</Link>
                    </h2>
                  </div>
                  <div className="job-metas">
                    <div className="d-flex flex-wrap">
                      <div className="category-job">
                        <div className="job-category with-icon">
                          <IoBriefcaseOutline />
                          <Link
                            to={
                              "/job-category/" +
                              item.category.toLowerCase().replace(" ", "-")
                            }
                          >
                            {item.category}
                          </Link>
                        </div>
                      </div>
                      <div className="job-deadline with-icon">
                        <i className="flaticon-wall-clock"></i>
                        {moment(item.expired_at).format("MMMM D, YYYY")}
                      </div>
                    </div>
                    <div>
                      <div className="job-type with-title">
                        <Link
                          className="type-job"
                          to={"/job-type/" + item.employment_type}
                        >
                          {item.employment_type}
                        </Link>
                      </div>
                      {Object.keys(item.priority).map((key) => {
                        if (item.priority[key]) {
                          let parts = key.split("_");
                          let type = parts[1];
                          return (
                            <Tooltip title={type} type={type}>
                              <button className="btn p-0 border-0 me-2">
                                <IoStar
                                  size={20}
                                  className={"icon-rounded star-badge " + type}
                                />
                              </button>
                            </Tooltip>
                          );
                        }
                      })}
                      {Object.keys(item.workplace_preference).map((key) => {
                        if (item.workplace_preference[key]) {
                          let parts = key.split("_");
                          let type = parts[1];
                          return (
                            <Tooltip title={type} type={type}>
                              <button className="btn p-0 border-0 me-2">
                                <IoStar
                                  size={20}
                                  className={"icon-rounded star-badge " + type}
                                />
                              </button>
                            </Tooltip>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <a className="btn-follow btn-action-job btn-add-job-shortlist">
                      <i className="flaticon-bookmark"></i>
                    </a>
                    <Link
                      to={item.external_link}
                      target="_blank"
                      className="btn btn-apply btn-apply-job-external "
                    >
                      Apply Now
                      <i className="next flaticon-right-arrow"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
