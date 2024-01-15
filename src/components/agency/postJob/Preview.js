import { Link } from "react-router-dom";
import Loader from "../../Loader";
import Header from "../../job/Header";
import Sidebar from "../../job/Sidebar";
import { useContext } from "react";
import { Context } from "../../../context/JobsContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { CircularProgress } from "@mui/material";

const Preview = ({ single_job, setJobStatus }) => {
  const {
    state: { formSubmit },
    saveJob,
  } = useContext(Context);

  const { showAlert } = useContext(AlertContext)

  const submitJob = async () => {
    await saveJob(single_job.id, { status: "pending" });
    showAlert("Job submitted successfully. Redirecting...");
    setTimeout(() => window.location = "/my-jobs", 1000)
  };

  return Object.keys(single_job).length === 0 ? (
    <Loader />
  ) : (
    <>
      <div className="job-actions mt-3 mb-3 justify-content-center d-flex gap-3">
        {single_job?.status === 'draft' && (
          <button
            className="btn btn-gray btn-hover-primary text-uppercase ls-3 p-3 px-4"
            onClick={submitJob}
          >
            Submit Job {formSubmit && <CircularProgress size={20} />}
          </button>
        )}
        <Link
          // to={"/job/edit/" + single_job.id}
          // reloadDocument={true}
          to={"/my-jobs"}
          className="btn btn-gray btn-hover-primary text-uppercase ls-3 p-3 px-4"
        >
          Edit Job
        </Link>
      </div>
      <div className="profile-header">
        <Header data={single_job} />
      </div>
      <div className="profile-content mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="content-section">
                <h1 className="content-title mt-0">Job Description</h1>
                <div dangerouslySetInnerHTML={{ __html: single_job.description }} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="profile-sidebar">
                <Sidebar data={single_job} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
