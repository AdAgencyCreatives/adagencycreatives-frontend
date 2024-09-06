import { Link } from "react-router-dom";
import "../../../styles/User/ProfileContent.scss";
import { IoBriefcaseOutline, IoStar } from "react-icons/io5";
import Tooltip from "../../Tooltip";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as JobsContext } from "../../../context/JobsContext";
import useHelper from "../../../hooks/useHelper";
import ApplyJob from "../../job/ApplyJob";

const JobContent = ({ user, data, item, setAuthModalOpen }) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [job, setJob] = useState(null);
  const [isJobApplied, setIsJobApplied] = useState(false);

  useEffect(() => {
    setIsJobApplied(item?.applications?.find(application => application?.user_id == user?.uuid) ? true : false);
  }, [item]);

  const { rectify_url } = useHelper();

  const {
    state: { role },
  } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const isCreative = role == "creative";

  const {
    state: { resume, profile_resume },
    getResume,
    getProfileResume,
    saveAttachment,
  } = useContext(CreativesContext);

  const {
    state: { isLoading },
    applyJob,
  } = useContext(JobsContext);

  const handleJob = async (job_id) => {
    setIsJobApplied(true);
  };

  const handleApplyExternalJob = async (job) => {
    await getResume(user.uuid);
    await getProfileResume(user.uuid);
    const response = await applyJob(user.uuid, job?.id, "Clicked Apply Now", resume?.length ? resume[0].id : -1, "External");
    setIsJobApplied(true);

  };

  const isAgency = user?.role == "agency";
  const isOwnProfile = isAgency && user?.uuid == data.user_id;

  return (
    <>
      <ApplyJob open={open} setOpen={setOpen} handleClose={handleClose} job_id={job} handleJob={handleJob} />
      <div className="job-item" key={item.id}>
        <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
          <div className="inner-left">
            <div className="employer-logo">
              <Link to={"/job/" + item.slug}>
                <img
                  width="150"
                  height="150"
                  src={item.agency?.user_thumbnail || item.agency.logo}
                  className=""
                  alt=""
                />
              </Link>
            </div>
            <div className="meta row w-100 align-items-center">
              <div className="job-list-content col-md-8">
                <div className="title-wrapper flex-middle-sm">
                  <h2 className="job-title">
                    <Link to={"/job/" + item.slug}>{item.title}</Link>
                  </h2>
                </div>
                <div className="job-metas">
                  <div className="d-flex flex-wrap">
                    {item.category && (
                      <div className="category-job">
                        <div className="job-category with-icon">
                          <IoBriefcaseOutline />
                          <Link
                            to={
                              "/job-category/" +
                              item.category
                                .toLowerCase()
                                .replace(" ", "-")
                            }
                          >
                            {item.category}
                          </Link>
                        </div>
                      </div>
                    )}
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
                                className={
                                  "icon-rounded star-badge " + type
                                }
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
                  {user && data ? (
                    !isOwnProfile && (
                      <>
                        {isJobApplied ? (
                          <Tooltip title={item.apply_type.toLowerCase() == "external" ? "" : "Already Applied"}>
                            {item.apply_type.toLowerCase() == "external" ? (
                              <Link
                                to={item.apply_type.toLowerCase() == "external" ? rectify_url(item.external_link) : ""}
                                target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                className={"btn btn-apply active external"}
                              >
                                Interested
                              </Link>
                            ) : (
                              <div className={"btn btn-apply active internal"}>
                                Applied
                              </div>
                            )}
                          </Tooltip>
                        ) : (
                          <>
                            {role == "creative" && (
                              <>
                                {isLoading && (<CircularProgress />)}
                                {user?.role?.length > 0 ? (
                                  <Tooltip type="featured" title={
                                    <div className="no-transform" style={{ whiteSpace: 'pre-line', color: '#000000' }}>{"Before applying we recommend" + "\n" + "you review your resume details" + "\n" + "Job Dashboard > My Resume"}</div>
                                  }>
                                    <Link
                                      to={item.apply_type.toLowerCase() == "external" ? rectify_url(item.external_link) : ""}
                                      target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                      className="btn btn-apply btn-apply-job-external "
                                      onClick={(e) => {
                                        if (!isCreative) {
                                          showAlert("Login as a Creative to apply");
                                          e.preventDefault();
                                        } else if (item.apply_type.toLowerCase() == "internal") {
                                          e.preventDefault();
                                          setJob(item.id);
                                          setOpen(true);
                                        } else if (item.apply_type.toLowerCase() == "external") {
                                          handleApplyExternalJob(item);
                                        }
                                      }}
                                      disabled={isLoading ? "disabled" : ""}
                                    >
                                      Apply Now
                                      <i className="next flaticon-right-arrow"></i>

                                    </Link>
                                  </Tooltip>
                                ) : (
                                  <Link
                                    to={item.apply_type.toLowerCase() == "external" ? rectify_url(item.external_link) : ""}
                                    target={item.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                                    className="btn btn-apply btn-apply-job-external "
                                    onClick={(e) => {
                                      if (!isCreative) {
                                        showAlert("Login as a Creative to apply");
                                        e.preventDefault();
                                      } else if (item.apply_type.toLowerCase() == "internal") {
                                        e.preventDefault();
                                        setJob(item.id);
                                        setOpen(true);
                                      } else if (item.apply_type.toLowerCase() == "external") {
                                        handleApplyExternalJob(item);
                                      }
                                    }}
                                    disabled={isLoading ? "disabled" : ""}
                                  >
                                    Apply Now
                                    <i className="next flaticon-right-arrow"></i>

                                  </Link>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <Link
                      onClick={() => setAuthModalOpen(true)}
                      className="btn btn-apply btn-apply-job-external">
                      Apply Now
                      <i className="next flaticon-right-arrow"></i>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default JobContent;
