import {
  IoBookmarkOutline,
  IoLocationOutline,
  IoPersonAdd,
} from "react-icons/io5";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
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
import { saveAs } from 'file-saver';
import { api } from "../../../api/api";

const Header = ({ data, role, user }) => {

  const { encodeSpecial, decodeSpecial } = useHelper();

  const [allowed, setAllowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [item, setItem] = useState({});
  const handleClose = () => setOpen(false);
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

  const isCreative = role == "creative";
  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;
  const [isFriend, setIsFriend] = useState(false)
  const [hasSubscription, setSubscription] = useState(false);

  useEffect(() => {
    setSubscription(subscription_status == "active");
    console.log(subscription_status);
  }, [subscription_status]);

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
  }, [])

  const downloadResume = async (url) => {
    const fileName = getDownloadFilename(url);
    try {
      if (url.indexOf("/download/resume?name=") > 0) {
        window.open(url);
      } else {
        // const response = await api.get(url);
        // saveAs(response.data, );
        fetch(url)
          .then(res => res.blob())
          .then(blob => saveAs(blob, fileName))
      }
    } catch (error) {
      showAlert(error?.message || "Sorry, an error occurred");
    }
  };

  const getDownloadFilename = (url) => {
    const extension = url.lastIndexOf(".") > 0 ? url.substring(url.lastIndexOf(".")) : '';
    return (data.name).replace(" ", "_") + "_AdAgencyCreatives_" + moment(new Date()) + extension;
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar rounded">
            <img
              src={data.profile_image || Placeholder}
              height={100}
              width={100}
              onError={(e) => {
                e.target.src = Placeholder; // Set the backup image source
              }}
            />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0 flex-md-nowrap flex-wrap">
                {(isOwnProfile || !isCreative || isFriend) && (
                  <a
                    href={"javascript:void(0)"}
                    onClick={(e) => downloadResume(data.resume)}>
                    <button
                      className="btn btn-dark fs-5"
                      onClick={(e) => isAdmin || (isAdvisor && hasSubscription) ||
                        validateAccess(
                          e,
                          [!hasSubscription, !isCreative],
                          "Add a job post to download resumes"
                        )
                      }
                    >
                      Download Resume
                    </button>
                  </a>
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
                      handleClose={handleCloseInvite}
                      item={data}
                    />
                    <button
                      className={
                        "btn btn-hover-primary" +
                        (isShortlisted ? " btn-theme" : " btn-dark")
                      }
                      onClick={shortlistHandler}
                    >
                      <IoBookmarkOutline size={25} />
                    </button>
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
