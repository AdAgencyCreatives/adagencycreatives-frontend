import { useContext, useState, useEffect } from "react";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as DataContext } from "../../context/DataContext";
import { Dialog, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoBookmarkOutline, IoCloseOutline, IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import {
  TfiBackRight,
  TfiCheck,
  TfiCheckBox,
  TfiClose,
  TfiDownload,
  TfiNotepad,
} from "react-icons/tfi";
import { IoStar } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import useApplicationStatusHelper from "../../hooks/useApplicationStatusHelper";

const TabularSingleJobApplication = (props) => {
  const [thisApplication, setThisApplication] = useState(props?.application);
  const [changingApplicationStatus, setChangingApplicationStatus] =
    useState(false);
  const [isOpenNotAlignedDialog, setIsOpenNotAlignedDialog] = useState(false);

  const { getStatusName, getStatusBadge } = useApplicationStatusHelper();

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { bookmarks, },
    createBookmark,
    getAllBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  useEffect(() => {
    (async () => {
      if (user) await getAllBookmarks(user.uuid, "creatives");
    })();
  }, [user])

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "creatives", id, () => {
      console.log("Creative added to shortlist");
    });
  };

  const removeFromShortlist = (id) => {
    removeBookmark(id, () => {
      console.log("Creative deleted from shortlist");
    });
  };

  const changeApplicationStatus = (status, cb = () => { }) => {
    let wasShortlisted = thisApplication.status == "shortlisted";

    setChangingApplicationStatus(true);
    setThisApplicationStatus(
      props?.job.id,
      thisApplication.id,
      status,
      () => {
        hideChangingApplicationStatus();
        cb();
      }
    );

    if (status == "shortlisted") {
      addToShortlist(thisApplication.creative_id);
    } else {
      if (wasShortlisted) {
        const isShortlisted =
          bookmarks.find(
            (bookmark) => bookmark.resource.user_id == thisApplication.user_id
          ) || false;
        if (isShortlisted) {
          removeFromShortlist(isShortlisted.id);
        }
      }
    }
  };

  const hideChangingApplicationStatus = () => {
    setChangingApplicationStatus(false);
  };

  useEffect(() => {
    setThisApplication(props?.application);
  }, [props?.application]);

  const setThisApplicationStatus = (
    job_id,
    application_id,
    application_status,
    cb = () => { }
  ) => {
    props?.setApplicationStatus(
      job_id,
      application_id,
      application_status,
      () => {
        let updatedApplication = { ...thisApplication };
        updatedApplication.status = application_status;
        setThisApplication(updatedApplication);
        cb();
      }
    );
  };

  const handleCloseNotAlignedDialog = () => {
    setIsOpenNotAlignedDialog(false);
  };

  const handleClickNotAlignedDialog = () => {
    changeApplicationStatus("rejected", () => {
      handleCloseNotAlignedDialog();
    });
  };

  return (
    <>
      <tr>
        <td style={{ width: "28%" }}>
          <Link
            className="link link-black hover-gold link-bold"
            to={"/creative/" + thisApplication.slug}
          >
            {thisApplication.user}
          </Link>
        </td>
        <td style={{ width: "27%" }}>
          {thisApplication?.creative_category || "--"}
        </td>
        <td style={{ width: "12%" }}>
          <div className="job-table-info-content-date-expiry">
            <div className="created">
              {moment(thisApplication.created_at).format("MMMM D, YYYY")}
            </div>
          </div>
        </td>
        <td style={{ width: "13%" }}>
          {props?.job?.apply_type.toLowerCase() != "external" ? (
            <span className={"badge " + getStatusBadge(thisApplication.status)} >
              {getStatusName(thisApplication?.status)}
            </span>
          ) : (
            <span className="badge bg-success">Clicked Apply Now</span>
          )}
        </td>
        <td style={{ width: "20%" }} className="job-table-actions nowrap">
          <div className="action-button">
            {changingApplicationStatus && (
              <CircularProgress style={{ width: "30px", height: "30px" }} />
            )}
            <Tooltip title="Add Notes">
              <button
                className="btn p-0 border-0 btn-hover-primary"
                onClick={() => {
                  props?.setAppId(thisApplication.creative_id);
                  props?.setOpen(true);
                }}
              >
                <TfiNotepad />
              </button>
            </Tooltip>
            {!props?.isJobDeleted &&
              !props?.isJobExpired &&
              (!props?.job?.advisor_id || user?.role == "advisor") &&
              props?.job?.apply_type.toLowerCase() != "external" && (
                <>
                  {thisApplication.status == "pending" ? (
                    <>
                      {user?.role == "advisor" && (
                        <Tooltip
                          title="Share Recommended Talent"
                          onClick={() => {
                            changeApplicationStatus("recommended");
                          }}
                        >
                          <button className="btn p-0 border-0 btn-hover-primary">
                            <TfiCheckBox className="icon-rounded" />
                          </button>
                        </Tooltip>
                      )}
                      <Tooltip
                        title="Interested"
                        onClick={() => {
                          changeApplicationStatus("accepted");
                        }}
                      >
                        <button className="btn p-0 border-0 btn-hover-primary">
                          <TfiCheck className="icon-rounded" />
                        </button>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip
                      title="Undo"
                      onClick={() => {
                        changeApplicationStatus("pending");
                      }}
                    >
                      <button className="btn p-0 border-0 btn-hover-primary">
                        <TfiBackRight
                          className="icon-rounded"
                          style={{ transform: "rotateY(180deg)" }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </>
              )}
            <Tooltip title="Download CV">
              <Link
                className="btn p-0 border-0 btn-hover-primary"
                to={
                  thisApplication?.resume_url?.length > 0
                    ? thisApplication.resume_url
                    : "javascript:void(0)"
                }
              >
                <TfiDownload className="icon-rounded" />
              </Link>
            </Tooltip>
            {thisApplication.status == "pending" &&
              !props?.isJobDeleted &&
              !props?.isJobExpired &&
              (!props?.job?.advisor_id || user?.role == "advisor") &&
              props?.job?.apply_type.toLowerCase() != "external" && (
                <>
                  <Tooltip
                    title="Shortlist"
                    onClick={() => {
                      changeApplicationStatus("shortlisted");
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <IoBookmarkOutline className="icon-rounded" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Hired"
                    onClick={() => {
                      changeApplicationStatus("hired");
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <IoStar className="icon-rounded" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Not Aligned"
                    onClick={() => {
                      setIsOpenNotAlignedDialog(true);
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <TfiClose className="icon-rounded" />
                    </button>
                  </Tooltip>
                  <Dialog
                    open={isOpenNotAlignedDialog}
                    onClose={handleCloseNotAlignedDialog}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    scroll="body"
                  >
                    <div className="auth-modal">
                      <div className="auth-header"></div>
                      <div className="auth-body">
                        <div className="job-apply-email-form-wrapper">
                          <div className="inner">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                              <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                                Decline Applicant?
                              </h3>
                              <button
                                className="border-0 bg-transparent text-primary"
                                onClick={handleCloseNotAlignedDialog}>
                                <IoCloseOutline size={30} />
                              </button>
                            </div>
                            <p>Once you decline the applicant they will automatically receive a Status Update email from Ad Agency Creatives.</p>
                            <p>Communication is important to our users. Don’t worry, we let them down gently.</p>
                            <div className="d-flex align-items-center justify-content-end">
                              {changingApplicationStatus && <CircularProgress size={20} />}
                              <button className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase" onClick={handleClickNotAlignedDialog}>
                                Not Aligned
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </>
              )}
          </div>
        </td>
      </tr >
    </>
  );
};

export default TabularSingleJobApplication;
