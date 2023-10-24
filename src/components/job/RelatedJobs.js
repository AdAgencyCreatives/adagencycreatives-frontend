import JobList from "./JobList";

const RelatedJobs = ({ data }) => {
  return data.length ? (
    <>
      <h2 className="content-title">Related Jobs</h2>
      <JobList data={data} showAgency={false} />
    </>
  ) : (
    ""
  );
};

export default RelatedJobs;
