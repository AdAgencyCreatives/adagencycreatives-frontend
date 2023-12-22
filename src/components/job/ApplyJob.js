import { Modal, Dialog, CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AlertContext } from "../../context/AlertContext";
import { FiFile } from "react-icons/fi";

const ApplyJob = ({ open, handleClose, job_id }) => {
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [jobMessage, setJobMessage] = useState("");
  const [resumeId, setResumeId] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const resumeRef = useRef();

  const {
    state: { resume },
    getResume,
    saveAttachment,
  } = useContext(CreativesContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { isLoading },
    applyJob,
  } = useContext(JobsContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    user && getResume(user.uuid);
  }, [user]);

  useEffect(() => {
    setResumeList(resume);
  }, [resume]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applyJob(user.uuid, job_id, jobMessage, resumeId);
      setMessage(true);
      setError(false);
      setTimeout(handleClose, 700);
      // setResumeList([]);
      setJobMessage('');
    } catch (e) {
      console.log(e);
      setMessage(false);
      setError(true);
    }

    /*  logActivity(
      user.uuid,
      "message_sent",
      "You sent message to Creative: " + item.name,
      "{user_id:'" + user.uuid + "', creative_id:'" + item.user_id + "'}"
    ); */
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "resume");
      const result = await saveAttachment(formData);
      if (result.data) {
        let data = result.data;
        setResumeList((prev) => [...prev, { id: data.id, name: filename }]);
        showAlert("Resume uploaded successfully");
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      <div className="add-note-modal job-apply-modal">
        <div className="addnote-header"></div>
        <div className="addnote-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <form id="jobapply-form" onSubmit={handleSubmit}>
                <p
                  className="text-center"
                  style={{ fontSize: 25, marginBottom: 20, fontWeight: 500 }}
                >
                  Apply for this job
                </p>
                {message && (
                  <div className={`alert alert-info`}>
                    Applied to job successfully
                  </div>
                )}
                {error && (
                  <div className={`alert alert-danger`}>
                    There was an error while applying to the job
                  </div>
                )}
                <p className="fs-5 text-center mt-3">Select your Resume</p>
                <div className="d-flex flex-wrap gap-3 mb-2 justify-content-center">
                  {resumeList.length > 0 ?
                    resumeList.map((item) => (
                      <button
                        className={
                          "btn-resume" + (resumeId == item.id ? " active" : "")
                        }
                        key={item.name}
                        onClick={() => setResumeId(item.id)}
                      >
                        <span className="icon_type">
                          <FiFile />
                        </span>
                        <div className="filename">{item.name}</div>
                      </button>
                    )) : (

                    )}
                </div>
                <p className="fs-5 text-center mt-3">or upload your CV</p>
                <div class="form-group upload-file-btn-wrapper">
                  <input
                    type="file"
                    name="cv_file"
                    data-file_types="txt|doc|docx|pdf"
                    className="d-none"
                    ref={resumeRef}
                    onChange={(e) => handleFileChange(e)}
                  />

                  <div
                    class="label-can-drag"
                    onClick={() => resumeRef.current.click()}
                  >
                    <div class="form-group group-upload">
                      <div
                        class="upload-file-btn"
                        data-text="Upload CV (txt, doc, docx, pdf)"
                      >
                        <span class="text">
                          Upload Resume (txt, doc, docs, pdf)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required="required"
                    rows={4}
                    value={jobMessage}
                    onChange={(e) => setJobMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2 mt-3">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      className="me-2"
                      name="remember"
                      id="remember"
                      required
                    />
                    <label
                      className="form-check-label"
                      style={{ fontSize: 18 }}
                      htmlFor="remember"
                      required
                    >
                      You accept our{" "}
                      <a href="/terms-and-conditions" target="_blank">
                        Terms and Conditions
                      </a>{" "}
                      and
                      <a href="/privacy-policy" target="_blank">
                        {" "}
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3">
                  Apply Job {isLoading && <CircularProgress size={20} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ApplyJob;
