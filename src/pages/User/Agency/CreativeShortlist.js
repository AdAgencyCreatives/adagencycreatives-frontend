import { Link } from "react-router-dom";
import Avatar from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../../../styles/AgencyDashboard/CreativeShortlist.scss";
import {
  TfiEye,
  TfiEmail,
  TfiClose,
  TfiCheck,
  TfiLocationPin,
  TfiNotepad,
} from "react-icons/tfi";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Message from "../../../components/dashboard/Modals/Message";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";

const CreativeShortlist = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const handleClose = () => setOpen(false);

  const [openNotes, setOpenNotes] = useState(false);
  const handleCloseNotes = () => setOpenNotes(false);
  const [appId, setAppId] = useState("");

  const {
    state: { bookmarks },
    getBookmarks,
    removeBookmark
  } = useContext(DataContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getBookmarks(user.uuid);
    }
  }, [user]);

  const openMessageDialog = (item) => {
    setItem(item);
    setOpen(true);
  };

  const openNotesDialog = (item) => {
    setAppId(item.resource.id);
    setOpenNotes(true);
  };

  return (
    <div className="agency-page-creative-shortlist">
      <h3 className="page-title">Creatives Shortlist</h3>
      <div className="card">
        {bookmarks.length ? (
          bookmarks.map((item, index) => {
            const resource = item.resource;
            return (
              <div
                className="candidate-list candidate-archive-layout"
                key={item.id}
              >
                <div className="d-flex align-items-center flex-wrap">
                  <div className="candidate-info">
                    <div className="d-flex align-items-center gap-4">
                      <div className="candidate-logo">
                        <Link>
                          <img
                            width="150"
                            height="150"
                            src={resource.profile_image || Avatar}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="candidate-info-content">
                        <div className="title-wrapper">
                          <h2 className="candidate-title">
                            <Link className="link-dark">{resource.name}</Link>
                          </h2>
                          {resource.priority.is_featured && (
                            <span
                              className="featured"
                              data-toggle="tooltip"
                              title=""
                              data-original-title="featured"
                            >
                              <TfiCheck strokeWidth="1" />
                            </span>
                          )}
                        </div>
                        <div className="job-metas">
                          <div className="candidate-category">
                            <Link
                              to={
                                resource.category &&
                                resource.category
                                  .toLowerCase()
                                  .replace(" ", "-")
                              }
                            >
                              {resource.title}
                            </Link>
                          </div>
                          {resource.location && (
                            <div className="candidate-location with-icon">
                              <TfiLocationPin />
                              <span className="restrict-location-search">
                                {resource.location.state}
                              </span>
                              ,
                              <span className="restrict-location-search">
                                {resource.location.city}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ali-right">
                    <div className="action-button">
                      <Tooltip title="Add Notes">
                        <Link
                          onClick={() => {
                            openNotesDialog(item);
                          }}
                        >
                          <TfiNotepad />
                        </Link>
                      </Tooltip>
                      <Tooltip title="View Profile">
                        <Link to={"/creative/" + resource.slug}>
                          <TfiEye />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Send Message">
                        <Link onClick={() => openMessageDialog(item)}>
                          <TfiEmail />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete Candidate">
                        <Link onClick={() => removeBookmark(item.id)}>
                          <TfiClose />
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="fs-5">There are no Creatives in your shortlist.</p>
        )}
      </div>
      <Message open={open} handleClose={handleClose} item={item} />
      <AddNotesModal
        open={openNotes}
        handleClose={handleCloseNotes}
        resource_id={appId}
        type="creatives"
      />
    </div>
  );
};

export default CreativeShortlist;
