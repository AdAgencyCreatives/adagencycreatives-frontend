import React from 'react';
import {
  IoBookmarkOutline,
} from "react-icons/io5";
import {
  TfiNotepad
} from "react-icons/tfi";
import "../../../styles/User/ProfileHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import FriendshipWidget from "../../../components/community/FriendshipWidget";
import Message from "../../dashboard/Modals/Message";
import Invite from "./Invite";
import useShortlist from "../../../hooks/useShortlist";
import { getMyFriends } from "../../../context/FriendsDataContext";
import useHelper from "../../../hooks/useHelper";
import CreativeLocation from "../../../components/CreativeLocation";
import moment from "moment";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import CreativeImageLoader from "../../../components/CreativeImageLoader";
import ResizableDiv from "../../ResizableDiv";
import DownloadProfilePdfButton from "./DownloadProfilePdfButton";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as ChatContext } from "../../../context/ChatContext";

const Header = React.memo(({ data, role, user, username, showButtons = true }) => {

  const anchor = window.location.hash.slice(1);
  const navigate = useNavigate();

  const { encodeSpecial, decodeSpecial } = useHelper();

  const [open, setOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [isDownloading, setDownloading] = useState(false);
  const [downloadProfilePdfAllowed, setDownloadProfilePdfAllowed] = useState(false);
  const [loadingDownloadProfile, setLoadingDownloadProfile] = useState(true);
  const [appIdNotes, setAppIdNotes] = useState("");

  const handleClose = () => setOpen(false);
  const handleCloseNotes = () => setOpenNotes(false);
  const handleCloseInvite = () => setOpenInvite(false);
  const { showAlert } = useContext(AlertContext);
  const { isShortlisted, shortlistHandler } = useShortlist(
    user?.uuid,
    data.id,
    "creatives"
  );

  const {
    state: { subscription_status },
  } = useContext(AuthContext);

  const {
    state: { single_creative_for_pdf, },
    getCreativeForPdf,
  } = useContext(CreativesContext);

  const {
    state: { contacts, },
  } = useContext(ChatContext);

  const isCreative = role == "creative";
  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";
  const isRecruiter = role == "recruiter";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;
  const [isFriend, setIsFriend] = useState(false)
  const [hasSubscription, setSubscription] = useState(false);
  const [downloadPdfFound, setDownloadPdfFound] = useState(false);

  useEffect(() => {
    setDownloadProfilePdfAllowed(role?.length > 0 && (isAdmin || ((isAgency || isAdvisor || isRecruiter) && hasSubscription)) && data && Object.keys(data)?.length > 0);
  }, [role, isAdmin, isAgency, isAdvisor, isRecruiter, hasSubscription]);

  useEffect(() => {
    setSubscription(subscription_status == "active");
    // console.log(subscription_status);
  }, [subscription_status]);

  useEffect(() => {
    if (downloadProfilePdfAllowed) {
      getCreativeForPdf(data.slug, (success, error) => {
        if (success) {
          setDownloadPdfFound(true);
          setLoadingDownloadProfile(false);
        }
        if (error) {
          console.log(error);
          setLoadingDownloadProfile(false);
        }
      });
    }
  }, [downloadProfilePdfAllowed]);

  const validateAccess = (e, permissions, message) => {
    if (permissions.length > 0) {
      console.log(permissions);
      let pass = permissions.every((value) => value === true);
      if (pass) {
        showAlert(message);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setLoadingDownloadProfile(true);
    getMyFriends().then(result => {
      setIsFriend(result.some((item) => item.user.uuid == data.user_id))
    });
  }, []);

  const getClientDateTime = () => {
    return moment(new Date()).format("YYYY-MM-DD");
  };

  const getDownloadFilename = () => {
    return (data.name).replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime();
  }

  const downloadResume = async (url) => {
    setDownloading(true);
    try {
      setDownloading(false);
      if (url.indexOf("/download/resume?name=") > 0) {
        const resume_name = (new URLSearchParams(url.substring(url.indexOf("?")))).get('name');
        let newUrl = url.replace(resume_name, getDownloadFilename());
        window.open(newUrl);
      } else {
        // const extension = url.lastIndexOf(".") > 0 ? url.substring(url.lastIndexOf(".")) : '';
        // const fileName = getDownloadFilename() + extension;
        setDownloading(false);
        window.open(`/creative/resume/${data.slug}`);
        // fetch(url)
        //   .then(res => res.blob())
        //   .then(blob => {
        //     setDownloading(false);
        //     saveAs(blob, fileName);
        //   })
        //   .catch((error) => {
        //     setDownloading(false);
        //     console.log(error);
        //     showAlert(error?.message || "Sorry, an error occurred");
        //   });
      }
    } catch (error) {
      setDownloading(false);
      console.log(error);
      showAlert(error?.message || "Sorry, an error occurred");
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top header">
          <div className="avatar rounded">
            <CreativeImageLoader creative={data} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-5">
              <div className="username">
                {data.name}
                {/* <span class="featured-text">
                Featured</span> */}
              </div>
              <div className="position">
                {isAdmin || (isAdvisor && hasSubscription) ? (<>
                  <Link to={"/creatives/search/industry-title/" + encodeSpecial(encodeURI(data.category))}>
                    {data.category}
                  </Link>
                </>) : (<>
                  {data.category}
                </>)}
              </div>
              <CreativeLocation location={data?.location} />
            </div>
            <div className="col-md-7">
              {showButtons && (
                <ResizableDiv uid="view-profile-actions" className="actions d-flex justify-content-md-end mt-3 mt-md-0 flex-md-nowrap flex-wrap">
                  {anchor?.length > 0 && anchor.indexOf("preview=") === 0 ? (<>
                    <Link className="btn btn-dark fs-5" to={"/creative/" + data?.slug}>
                      Visit Profile
                    </Link>
                  </>) : (<>
                    {loadingDownloadProfile ? (<>
                      {downloadProfilePdfAllowed && (
                        <button className={"btn btn-silver fs-5"} style={{ cursor: 'wait' }}>Download Profile</button>
                      )}
                    </>) : (<>
                      {(downloadProfilePdfAllowed && downloadPdfFound && single_creative_for_pdf && Object.keys(single_creative_for_pdf)?.length > 0) && (
                        <DownloadProfilePdfButton data={single_creative_for_pdf} filename={getDownloadFilename()} allowPhone={isAdmin || data?.logged_in_user?.is_creative_applicant} />
                      )}
                    </>)}
                  </>)}
                  {isDownloading && (<CircularProgress style={{ minWidth: "40px", minHeight: "40px" }} />)}
                  {(isOwnProfile || !isCreative || isFriend) && (
                    <>
                      <a
                        href={"javascript:void(0)"}
                        onClick={(e) => isDownloading ? showAlert("Please wait. Download in progress, or refresh page") : downloadResume(data.resume)}>
                        <button
                          className={"btn btn-dark fs-5" + (isDownloading ? " disabled" : "")}
                          onClick={(e) => isAdmin || (isAdvisor && hasSubscription) ||
                            validateAccess(
                              e,
                              [!hasSubscription, !isCreative],
                              "Post a Job to download resumes"
                            )
                          }
                        >
                          Download Resume
                        </button>
                      </a>
                    </>
                  )}
                  {!isOwnProfile && (
                    <>
                      <button
                        className="btn btn-dark fs-5"
                        onClick={(e) =>
                          validateAccess(
                            e,
                            [!hasSubscription, !isCreative],
                            "Post a Job for private message capabilities"
                          ) && setOpen(true)
                        }
                      >
                        Private Message
                      </button>
                      <Message
                        open={open}
                        setOpen={setOpen}
                        handleClose={handleClose}
                        item={data}
                        type="private"
                      />
                      {/* {isCreative ? "private" : "job"} */}
                    </>
                  )}
                  {isCreative && <FriendshipWidget creative={data} header={true} />}
                  {!isCreative && (
                    <>
                      <button
                        className="btn btn-dark fs-5"
                        onClick={(e) =>
                          validateAccess(
                            e,
                            [!hasSubscription, !isCreative],
                            "Post a Job to invite creatives to apply"
                          ) && setOpenInvite(true)
                        }
                      >
                        Invite
                      </button>
                      <Invite
                        open={openInvite}
                        setOpen={setOpenInvite}
                        handleClose={handleCloseInvite}
                        item={data}
                      />
                      <button
                        className={
                          "btn btn-hover-primary" +
                          (isShortlisted ? " btn-theme" : " btn-dark")
                        }
                        onClick={(e) => shortlistHandler('Creative')}
                      >
                        <IoBookmarkOutline size={25} />
                      </button>
                      <Tooltip title="Add Notes">
                        <button
                          className="btn btn-hover-primary btn-dark"
                          onClick={() => {
                            setAppIdNotes(data.id);
                            setOpenNotes(true);
                          }}
                        >
                          <TfiNotepad size={25} />
                        </button>
                      </Tooltip>
                      <AddNotesModal
                        open={openNotes}
                        setOpen={setOpenNotes}
                        handleClose={handleCloseNotes}
                        resource_id={appIdNotes}
                        type="creatives"
                      />
                    </>
                  )}
                </ResizableDiv>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Header;
