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
import { Context } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { useContext, useEffect, useState } from "react";
import ApplyJob from "./ApplyJob";
import { CircularProgress } from "@mui/material";
import useHelper from "../../hooks/useHelper";

const Header = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [job, setJob] = useState(null);
  const [isJobApplied, setIsJobApplied] = useState(false);

  const { rectify_url } = useHelper();

  const {
    state: { user, role },
  } = useContext(Context);

  const { showAlert } = useContext(AlertContext);

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

  const isCreative = role == "creative";

  useEffect(() => {
    setIsJobApplied(data.logged_in_user?.user_has_applied);
  }, [data]);

  const handleJob = async (job_id) => {
    setIsJobApplied(true);
  };

  const handleApplyExternalJob = async (job) => {
    await getResume(user.uuid);
    await getProfileResume(user.uuid);

    console.log(job);
    const response = await applyJob(user.uuid, job?.id, "Interested", resume?.length ? resume[0].id : -1);
    setIsJobApplied(true);

  };

  return (
    <div className="container">
      <ApplyJob open={open} setOpen={setOpen} handleClose={handleClose} job_id={job} handleJob={handleJob} />
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
                      to={`/job-location-state/${data.location.state}`}
                    >
                      {data.location.state},&nbsp;
                    </Link>
                    <Link
                      className="text-black"
                      to={`/job-location-city/${data.location.city}`}
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
                {isJobApplied ? (
                  <Link
                    to={data.apply_type.toLowerCase() == "external" ? rectify_url(data.external_link) : ""}
                    target={data.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                    className="btn btn-apply active"
                  >
                    Applied
                  </Link>
                ) : (
                  <>
                    {role == "creative" && (
                      <>
                        {isLoading && (<CircularProgress />)}
                        <Link
                          to={data.apply_type.toLowerCase() == "external" ? rectify_url(data.external_link) : ""}
                          target={data.apply_type.toLowerCase() == "external" ? "_blank" : ""}
                          className="btn btn-apply btn-apply-job-external "
                          onClick={(e) => {
                            if (!isCreative) {
                              showAlert("Login as a creative to apply to this job");
                              e.preventDefault();
                            } else if (data.apply_type.toLowerCase() == "internal") {
                              e.preventDefault();
                              setJob(data.id);
                              setOpen(true);
                            } else if (data.apply_type.toLowerCase() == "external") {
                              handleApplyExternalJob(data);
                            }
                          }}
                          disabled={isLoading ? "disabled" : ""}
                        >
                          Apply Now
                          <i className="next flaticon-right-arrow"></i>

                        </Link>
                      </>
                    )}
                  </>
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
