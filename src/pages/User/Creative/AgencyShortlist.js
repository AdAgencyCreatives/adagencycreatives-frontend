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
import { Context as AlertContext } from "../../../context/AlertContext";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";

const AgencyShortlist = () => {
  const [openNotes, setOpenNotes] = useState(false);
  const handleCloseNotes = () => setOpenNotes(false);
  const [appId, setAppId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    state: { bookmarks, meta },
    getBookmarks, loadBookmarks, removeBookmark,
  } = useContext(DataContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (user) {
      getBookmarks(user.uuid, "agencies");
      setCurrentPage(1);
    }
  }, [user]);

  useEffect(() => {
    bookmarks && setIsLoading(false);
  }, [bookmarks]);

  const paginate = (page) => {
    loadBookmarks(user.uuid, "agencies", page, () => {
      setCurrentPage(page);
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    });
  };

  const openNotesDialog = (item) => {
    setAppId(item.resource.id);
    setOpenNotes(true);
  };

  const removeFromShortlist = (id) => {
    let newPage = Math.ceil((meta?.total - 1) / 9);
    removeBookmark(id, () => {
      showAlert('Agency deleted from shortlist');
      paginate(currentPage <= newPage ? currentPage : newPage);
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="creative-page-agency-shortlist">
      <h3 className="page-title">Agencies Shortlist</h3>
      <div className="card">
        {bookmarks && meta?.total > 9 && <Paginate meta={meta} paginate={paginate} title={"shortlisted agencies"} />}
        {bookmarks.length ? (
          bookmarks.map((item, index) => {
            const resource = item.resource;
            return (
              <div className="employer-list" key={index}>
                <div className="row align-items-center justify-content-between">
                  <div className="col-12 d-md-flex align-items-top d-sm-block">
                    <div className="avatar employer me-3">
                      <img
                        src={resource?.logo || Placeholder}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="meta row w-100 align-items-center">
                      <div className="col-sm-6">
                        <div className="username">
                          <Link
                            to={"/agency/" + resource?.slug}
                            className="link-dark link-hover-dark"
                          >
                            {resource?.name}
                          </Link>
                        </div>
                        <div className="user-meta">
                          {resource?.location.state && (
                            <div className="job-location location">
                              {(resource?.location?.state?.length || resource?.location?.city?.length) && (<IoLocationOutline />)}
                              <Link
                                to={`/agencies/location/state/${resource?.location.state}`}
                              >
                                {resource?.location.state}
                              </Link>
                              {(resource?.location?.state?.length && resource?.location?.city?.length) && (<span>,&nbsp;</span>)}
                              <Link
                                to={`/agencies/location/city/${resource?.location.city}`}
                              >
                                {resource?.location.city}
                              </Link>
                            </div>
                          )}
                          {resource?.industry_experience.length ? (
                            <div className="position">
                              <IoBriefcaseOutline />
                              {resource?.industry_experience.map(
                                (item, index) => (
                                  <React.Fragment key={"i_" + index}>
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
                                      {item}{index < resource?.industry_experience.length - 1 && ","}
                                    </Link>
                                  </React.Fragment>
                                )
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 d-flex gap-2 flex-wrap flex-md-nowrap mt-2 mt-sm-0 justify-content-md-end">
                        <div className="open-jobs-btn m-0">
                          <Link to={`/agency/${resource?.slug}`}>
                            Open Jobs - {resource?.open_jobs}
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
                          onClick={() => removeFromShortlist(item.id)}
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
        {bookmarks && meta?.total > 9 && <Paginate meta={meta} paginate={paginate} title={"shortlisted agencies"} />}
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
