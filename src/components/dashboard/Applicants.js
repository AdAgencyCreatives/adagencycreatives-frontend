import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import AddNotesModal from "./Modals/AddNotesModal";
import { CircularProgress } from "@mui/material";
import Paginate from "../../components/Paginate";
import RecentApplicant from "../../components/dashboard/RecentApplicant";

const Applicants = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [data, setData] = useState([]);
  const {
    state: { applications, isLoading, applicationMeta },
    getApplications,
    updateApplication,
    deleteApplication,
    application_remove_from_recent,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const paginate = (page) => {
    getApplications(user.uuid, 1, page, 1, false, "yes");
  };

  useEffect(() => {
    getApplications(user.uuid, 1, false, 1, false, "yes");
  }, [user]);

  useEffect(() => {
    if (applications?.length > 0) {
      let updatedJobs = [];

      for (let index = 0; index < applications.length; index++) {
        const job = applications[index];
        const updatedApplications = [];
        for (let appIndex = 0; appIndex < job.applications.length; appIndex++) {
          const appl = job.applications[appIndex];
          const remove_from_recent_arr = appl?.removed_from_recent ? appl.removed_from_recent.split(',') : [];
          const user_id = '' + user.id;

          if (!remove_from_recent_arr.includes(user_id)) {
            updatedApplications.push(appl);
          }
        }

        const updatedJob = { ...job, applications: updatedApplications };
        updatedJobs.push(updatedJob);
      }

      filterJobApplicants(updatedJobs);
    }
  }, [applications]);

  const filterJobApplicants = (foundJobs) => {
    const filteredJobs = foundJobs.map((job) => {
      if (job?.advisor_id != null && job?.advisor_id != user?.id) {
        var recommendedApplicants = job.applications.filter((application) => application.status == "recommended");
        var updatedJob = { ...job };
        updatedJob.applications = recommendedApplicants;
        return updatedJob;

      }
      return job;
    });
    setData(filteredJobs);
  };

  const setApplicationStatus = (job_id, app_id, status, cb = () => { }) => {
    updateApplication(app_id, { status }, () => {
      let jobIndex = applications.findIndex((job) => job.id == job_id);
      const updatedJob = { ...applications[jobIndex] };
      let updatedApplications = updatedJob.applications;
      let appIndex = updatedApplications.findIndex((app) => app.id == app_id);
      let updatedApp = { ...updatedApplications[appIndex] };
      updatedApp.status = status;
      updatedApplications[appIndex] = updatedApp;
      const updatedData = [...applications];
      updatedData[jobIndex] = { ...updatedJob };
      setData(updatedData);
      showAlert("Creative status change successful");
      cb();

      if (status != "pending") {
        // remove from list
        onRemoveFromRecent(null, { id: app_id });
      }
    });
  };

  const removeApplicationFromList = (app_id) => {
    let updatedJobs = [];

    for (let index = 0; index < data.length; index++) {
      const job = data[index];
      const updatedApplications = [];
      for (let appIndex = 0; appIndex < job.applications.length; appIndex++) {
        const appl = job.applications[appIndex];
        if (appl.id != app_id) {
          updatedApplications.push(appl);
        }
      }

      const updatedJob = { ...job, applications: updatedApplications };
      updatedJobs.push(updatedJob);
    }
    setData(updatedJobs);
  };

  const onRemoveFromRecent = async (e, application) => {
    e?.preventDefault && e.preventDefault();
    application_remove_from_recent(application.id, user.uuid, () => {
      removeApplicationFromList(application.id);
    });
    return false;
  };

  return (
    <div className="agency-page-jobapplicants">
      <div className="card">
        <div className="card-title">Recent Applicants</div>
        <AddNotesModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          resource_id={appId}
          type="creatives"
        />
        <div className="card-body">
          {isLoading ? (
            <div className="center-page">
              <CircularProgress />
              <span>Loading ...</span>
            </div>
          ) : (
            <>
              {data.map((item, index) => (
                <div className="applicants-inner" key={index}>
                  {item?.applications?.length > 0 &&
                    item?.applications.map((application) => (
                      <RecentApplicant job={item} application={application}
                        setApplicationStatus={setApplicationStatus}
                        onRemoveFromRecent={onRemoveFromRecent}
                        setAppId={setAppId}
                        setOpen={setOpen}
                        isJobExpired={
                          item?.expired_at &&
                          new Date(item?.expired_at) <=
                          Date.parse(new Date().toISOString())
                        }
                        isJobDeleted={
                          item?.deleted_at &&
                          new Date(item?.deleted_at) <
                          Date.parse(new Date().toISOString())
                        }
                      />
                    ))}
                </div>
              ))}
              {applicationMeta.total > 10 && (
                <Paginate
                  meta={applicationMeta}
                  paginate={paginate}
                  title={"recent applicants"}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
