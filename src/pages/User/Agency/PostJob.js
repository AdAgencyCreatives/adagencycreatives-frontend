import { useState } from "react";
import Packages from "../../../components/agency/postJob/Packages";
import Form from "../../../components/agency/postJob/Form";

const PostJob = () => {
  const [selectedPackage, setPackage] = useState(null);
  console.log({ selectedPackage });
  return (
    <div className="agency-page-post-job">
      {selectedPackage === null ? (
        <Packages setPackage={setPackage} />
      ) : (
        <Form />
      )}
    </div>
  );
};

export default PostJob;
