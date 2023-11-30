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

const Header = ({ data, role, user }) => {
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
  const [isFriend,setIsFriend] = useState(false)
  const [hasSubscription, setSubscription] = useState(false);

  useEffect(() => {
    setSubscription(subscription_status == "active");
    console.log(subscription_status);
  }, [subscription_status]);

  const validateAccess = (e, permissions, message) => {
    if (permissions.length > 0) {
      let pass = permissions.every((value) => value === true);
      if (pass) {
        showAlert(message);
        e.preventDefault();
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    getMyFriends().then(result => {
      setIsFriend(result.some((item) => item.user.uuid == data.user_id ))
    });
  },[])

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar rounded">
            <img
              src={data.profile_image || Placeholder}
              height={100}
              width={100}
            />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6">
              <div className="username">
                {data.name}
                {/* <span class="featured-text">Featured</span> */}
              </div>
              <div className="position">{data.category}</div>
              {data.location.state && (
                <div className="job-location location">
                  <IoLocationOutline />
                  {isAdmin || isAdvisor ? (<>
                    <Link to={"/creatives/search/state/" + data.location.state}>
                    {data.location.state}
                    </Link>
                  </>) : (<>
                    {data.location.state}
                  </>)}
                  ,&nbsp;
                  {isAdmin || isAdvisor ? (<>
                    <Link to={"/creatives/search/city/" + data.location.city}>
                    {data.location.city}
                    </Link>
                  </>) : (<>
                    {data.location.city}
                  </>)}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0 flex-md-nowrap flex-wrap">
                {(isOwnProfile || !isCreative || isFriend) && (
                  <a
                    href={data.resume}
                    target="__blank"
                    onClick={(e) => isAdmin || isAdvisor ||
                      validateAccess(
                        e,
                        [!hasSubscription, !isCreative],
                        "Post a Job to download resumes"
                      )
                    }
                  >
                    <button className="btn btn-dark fs-5">
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
                      type={isCreative ? "private" : "job"}
                    />
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
