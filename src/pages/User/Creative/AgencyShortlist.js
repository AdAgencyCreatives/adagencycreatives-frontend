import { Link } from "react-router-dom";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/CreativeDashboard/AgencyShortlist.scss";
import React, { useContext, useEffect, useState } from "react";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";

const AgencyShortlist = () => {
  const [openNotes, setOpenNotes] = useState(false);
  const handleCloseNotes = () => setOpenNotes(false);
  const [appId, setAppId] = useState("");

  const {
    state: { bookmarks },
    getBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getBookmarks(user.uuid);
    }
  }, [user]);

  const openNotesDialog = (item) => {
    setAppId(item.resource.id);
    setOpenNotes(true);
  };

  return (
    <div className="creative-page-agency-shortlist">
      <h3 className="page-title">Agencies Shortlist</h3>
      <div className="card">
        {bookmarks.length ? (
          bookmarks.map((item, index) => {
            const resource = item.resource;
            return (
              <div classname="employer-list" key={index}>
                <div classname="row align-items-center justify-content-between">
                  <div classname="col-12 d-flex align-items-top">
                    <div className="avatar employer me-3">
                      <img
                        src={resource.logo || Placeholder}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="meta row w-100 align-items-center">
                      <div className="col-sm-6">
                        <div className="username">
                          <Link
                            to={"/agency/" + resource.slug}
                            className="link-dark link-hover-dark"
                          >
                            {resource.name}
                          </Link>
                        </div>
                        <div className="user-meta">
                          {resource.location.state && (
                            <div className="job-location location">
                              <IoLocationOutline />
                              <Link
                                to={`/agency-location/${resource.location.state}`}
                              >
                                {resource.location.state},
                              </Link>
                              <Link
                                to={`/agency-location/${resource.location.city}`}
                              >
                                {resource.location.city}
                              </Link>
                            </div>
                          )}
                          {resource.industry_experience.length ? (
                            <div className="position">
                              <IoBriefcaseOutline />
                              {resource.industry_experience.map(
                                (item, index) => (
                                  <React.Fragment key={"i_"+index}>
                                    <Link
                                      to={
                                        "/agency-category/" +
                                        item
                                          .toLowerCase()
                                          .replace(" ", "-")
                                          .replace("|", "-")
                                      }
                                      className="link-gray"
                                    >
                                      {item}
                                    </Link>
                                    {index <
                                      resource.industry_experience.length - 1 &&
                                      ","}
                                  </React.Fragment>
                                )
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-sm-5 d-flex gap-2 flex-wrap flex-md-nowrap mt-2 mt-sm-0">
                        <div className="open-jobs-btn m-0">
                          <Link to={`/agency/${resource.slug}`}>
                            Open Jobs - {resource.open_jobs}
                          </Link>
                        </div>
                        <div className="open-jobs-btn m-0">
                          <Link onClick={() => openNotesDialog(item)}>
                            Add Note
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-1">
                        <button
                          className="btn bg-primary shortlist"
                          onClick={() => removeBookmark(item.id)}
                        >
                          <IoBookmarkOutline size={18} color="white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="fs-5">There are no Agencies in your shortlist.</p>
        )}
      </div>
      <AddNotesModal
        open={openNotes}
        handleClose={handleCloseNotes}
        resource_id={appId}
        type="agencies"
      />
    </div>
  );
};

export default AgencyShortlist;
