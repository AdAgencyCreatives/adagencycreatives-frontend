import { IoBriefcaseOutline, IoLocationOutline, IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Tooltip from "../../components/Tooltip";
import moment from "moment";
import Placeholder from "../../assets/images/placeholder.png";
import { useContext, useState, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as JobsContext } from "../../context/JobsContext";
import ApplyJob from "./ApplyJob";
import useHelper from "../../hooks/useHelper";
import { CircularProgress } from "@mui/material";
import AgencyImageLoader from "../AgencyImageLoader";
import JobListItem from "./JobListItem";

const JobList = ({ data, showAgency = true }) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [job, setJob] = useState(null);

  const { rectify_url } = useHelper();

  const {
    state: { user, role },
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
    console.log("job_id parent", job_id);
    if (job_id != null) {
      data = data.map((item) => {
        if (item.id == job_id && item.logged_in_user) {
          item.logged_in_user.user_has_applied = true
        }
      });
    }
    console.log("data", data);
  };

  const handleApplyExternalJob = async (job) => {
    await getResume(user.uuid);
    await getProfileResume(user.uuid);
    const response = await applyJob(user.uuid, job?.id, "Clicked Apply Now", resume?.length > 0 ? resume[0].id : -1, "External");
    handleJob(job?.id);
  };

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <div className="jobs-list-container">
      <ApplyJob open={open} setOpen={setOpen} handleClose={handleClose} job_id={job} handleJob={handleJob} />
      {data.map((item) => (
        <JobListItem
          item={item}
          showAgency={showAgency}
          user={user}
          role={role}
          rectify_url={rectify_url}
          isLoading={isLoading}
          isCreative={isCreative}
          showAlert={showAlert}
          setJob={setJob}
          handleApplyExternalJob={handleApplyExternalJob}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
};

export default JobList;
