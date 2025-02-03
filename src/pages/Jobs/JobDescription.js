import { useParams } from "react-router-dom";
import Header from "../../components/job/Header";
import Sidebar from "../../components/job/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import RelatedJobs from "../../components/job/RelatedJobs";
import "../../styles/JobDescription.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useSeoHelper from "../../hooks/useSeoHelper";

const JobDescription = () => {

  const { changeSeo } = useSeoHelper();

  const [pageStatus, setPageStatus] = useState("page-loading");
  const { job } = useParams();
  const { height, width } = useWindowDimensions();

  const {
    state: { single_job, related_jobs },
    getJob,
  } = useContext(JobsContext);

  const {
    state: { user, role },
  } = useContext(AuthContext);

  useEffect(() => {
    getJob(job, user, (status) => { setPageStatus(status); });
  }, [job, user]);

  useEffect(() => {
    if (single_job && Object.keys(single_job)?.length > 0) {
      if (single_job?.seo?.tags?.length > 0) changeSeo('keywords', single_job.seo.tags);
      if (single_job?.seo?.description?.length > 0) changeSeo('description', single_job.seo.description);
      if (single_job?.seo?.title?.length > 0) changeSeo('title', single_job.seo.title);
    }
  }, [single_job]);

  return pageStatus == 'page-loading' ? (
    <Loader />
  ) : (
    <>
      {pageStatus == 'job-not-found' ? (<>
        <div class="loader" style={{ height: '100vh' }}><b>Job not found, either the slug is changed or the job has been closed.</b></div>
      </>) : (<>
        <div className="profile-header">
          <Header data={single_job} />
        </div>
        <div className="profile-content mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="content-section">
                  <h1 className="content-title mt-0">Job Description</h1>
                  {single_job.description.split("\n\n").map((line) => (
                    <p dangerouslySetInnerHTML={{ __html: line }}></p>
                  ))}
                  {width > 767 && (
                    <RelatedJobs data={related_jobs} />
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="profile-sidebar">
                  <Sidebar data={single_job} role={role} />
                </div>
              </div>
              {width <= 767 && (
                <RelatedJobs data={related_jobs} />
              )}
            </div>
          </div>
        </div>
      </>)}
    </>
  );
};

export default JobDescription;
