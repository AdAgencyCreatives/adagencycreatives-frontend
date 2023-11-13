import { useState } from "react";
import Packages from "../../../components/agency/postJob/Packages";
import Form from "../../../components/agency/postJob/Form";
import Preview from "../../../components/agency/postJob/Preview";
import JobPostForm from "../../Jobs/JobPostForm";
import { useContext } from "react";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as SubscriptionContext } from "../../../context/SubscriptionContext";
import { Context as AgencyContext } from "../../../context/AgenciesContext";
import { useEffect } from "react";
import Checkout from "../../Cart/Checkout";
import Loader from "../../../components/Loader";

const PostJob = () => {
  const [selectedPackage, setPackage] = useState(null);
  const [jobStatus, setJobStatus] = useState("");
  const {
    state: { single_job },
    getJobById,
  } = useContext(JobsContext);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  const {
    state: { status, subscription },
    getSubscription,
  } = useContext(SubscriptionContext);

  useEffect(() => {
    //if (token) getJobById("08e8e21d-4e61-4455-a190-49386a111ced");
    if (token) getSubscription();
  }, [token]);

  useEffect(() => {
    if (!status && subscription) {
      if (subscription.length == 0 || subscription.status == "expired") {
        setJobStatus("select_package");
      } else {
        setJobStatus("select_package");
      }
    }
  }, [status, subscription]);

  const getView = () => {
    switch (jobStatus) {
      case "select_package":
        return <Packages setPackage={setPackage} setJobStatus={setJobStatus} user={user} />;
      case "create":
        return <JobPostForm setJobStatus={setJobStatus} />;
      case "preview":
        return <Preview single_job={single_job} setJobStatus={setJobStatus} />;
      default:
        return <Loader />;
    }
  };
  return <div className="agency-page-post-job">{getView()}</div>;
};

export default PostJob;
