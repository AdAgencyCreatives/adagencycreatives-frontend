import { useState } from "react";
import Packages from "../../../components/agency/postJob/Packages";
import Form from "../../../components/agency/postJob/Form";
import Preview from "../../../components/agency/postJob/Preview";

const PostJob = () => {
  const [selectedPackage, setPackage] = useState(null);
  const [jobStatus, setJobStatus] = useState("create");

  return (
    <div className="agency-page-post-job">
      {jobStatus === "create" ? (
        selectedPackage === null ? (
          <Packages setPackage={setPackage} />
        ) : (
          <Form setJobStatus={setJobStatus} />
        )
      ) : (
        <Preview />
      )}
    </div>
  );
};

export default PostJob;
