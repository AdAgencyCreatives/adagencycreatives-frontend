import {
  IoBookmarkOutline,
  IoLocationOutline,
  IoPersonAdd,
} from "react-icons/io5";
import {
  TfiNotepad
} from "react-icons/tfi";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import FriendshipWidget from "../../../components/community/FriendshipWidget";
import Message from "../../dashboard/Modals/Message";
import Invite from "./Invite";
import useShortlist from "../../../hooks/useShortlist";
import { getMyFriends } from "../../../context/FriendsDataContext";
import useHelper from "../../../hooks/useHelper";
import CreativeLocation from "../../../components/CreativeLocation";
import moment from "moment";
import { saveAs } from 'file-saver';
import { CircularProgress, Tooltip } from "@mui/material";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import CreativeProfilePdf from "../CreativeProfilePdf"

const Header = ({ data, role, user, creative_education, creative_experience }) => {

  const { encodeSpecial, decodeSpecial } = useHelper();

  const [allowed, setAllowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [item, setItem] = useState({});
  const [isDownloading, setDownloading] = useState(false);
  const [appIdNotes, setAppIdNotes] = useState("");
  const [hasCreativeApplied, setHasCreativeApplied] = useState(false);
  const [allQuriesDone, setAllQueriesDone] = useState(false);

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
    isCreativeApplicant,
  } = useContext(AgenciesContext);

  const isCreative = role == "creative";
  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";
  const isRecruiter = role == "recruiter";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;
  const [isFriend, setIsFriend] = useState(false)
  const [hasSubscription, setSubscription] = useState(false);

  useEffect(() => {
    setSubscription(subscription_status == "active");
    console.log(subscription_status);
  }, [subscription_status]);

  useEffect(() => {
    if (user?.uuid?.length > 0 && data?.user_id?.length > 0)
      isCreativeApplicant(user.uuid, data.user_id, (data) => {
        setHasCreativeApplied(data);
        setAllQueriesDone(true);
      });
  }, [user, data]);

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
      if (url.indexOf("/download/resume?name=") > 0) {
        const resume_name = (new URLSearchParams(url.substring(url.indexOf("?")))).get('name');
        let newUrl = url.replace(resume_name, getDownloadFilename());
        setDownloading(false);
        window.open(newUrl);
      } else {
        const extension = url.lastIndexOf(".") > 0 ? url.substring(url.lastIndexOf(".")) : '';
        const fileName = getDownloadFilename() + extension;
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            setDownloading(false);
            saveAs(blob, fileName);
          })
          .catch((error) => {
            setDownloading(false);
            console.log(error);
            showAlert(error?.message || "Sorry, an error occurred");
          });
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
        <div className="col-12 d-flex align-items-top">
          <div className="avatar rounded">
            <img
              src={data?.user_thumbnail || data.profile_image || Placeholder}
              height={100}
              width={100}
              onError={(e) => {
                e.target.src = Placeholder; // Set the backup image source
              }}
            />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-5">
              <div className="username">
                {data.name}
                {/* <span class="featured-text">Featured</span> */}
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
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0 flex-md-nowrap flex-wrap">
                {allQuriesDone && ((isAdmin || ((isAgency || isAdvisor || isRecruiter) && hasSubscription)) && data && Object.keys(data).length > 0) && (
                  <>
                    <PDFDownloadLink className="" document={<CreativeProfilePdf data={data} filename={getDownloadFilename()} creative_education={creative_education} creative_experience={creative_experience} />} fileName={getDownloadFilename() + ".pdf"} allowPhone={isAdmin || hasCreativeApplied}>
                      <button className={"btn btn-dark fs-5"}>
                        Download Profile PDF
                      </button>
                    </PDFDownloadLink>
                    {/* <a className="desktop-view" href={"/creative-profile/" + data.slug} target="_blank">
                      <button className={"btn btn-dark fs-5"}>
                        View/Download Profile PDF
                      </button>
                    </a> */}
                  </>
                )}
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
                      handleClose={handleClose}
                      item={data}
                      type="private"
                    />
                    {/* {isCreative ? "private" : "job"} */}
                  </>
                )}
                {isCreative && <FriendshipWidget creative={data} />}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
