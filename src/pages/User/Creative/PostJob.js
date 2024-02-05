import { useState } from "react";
import Packages from "../../../components/agency/postJob/Packages";
import Form from "../../../components/agency/postJob/Form";
import Preview from "../../../components/agency/postJob/Preview";

const PostJob = () => {
  const [selectedPackage, setPackage] = useState(null);
  const [jobStatus, setJobStatus] = useState("create");

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12 mb-4 mb-md-0">
          <div className="restricted-creatives-only">
            <div className="restricted-message">
              <h4>Post A Job is restricted for agencies only.</h4>
              <h5>Please login as an agency to post a job.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
