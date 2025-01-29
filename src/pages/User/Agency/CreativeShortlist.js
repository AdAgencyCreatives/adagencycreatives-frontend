import { Link } from "react-router-dom";
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
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import SearchBarCommon from "../../../components/SearchBarCommon";
import CreativeImageLoader from "../../../components/CreativeImageLoader";
import DelayedOutput from "../../../components/DelayedOutput";

const CreativeShortlist = () => {

  const [searchInput, setSearchInput] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const handleClose = () => setOpen(false);

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
    state: { subscription_status, user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (user) {
      getBookmarks(searchInput, user.uuid, "creatives");
    }
  }, [user]);

  useEffect(() => {
    bookmarks && setIsLoading(false);
  }, [bookmarks]);

  const paginate = (page) => {
    loadBookmarks(searchInput, user.uuid, "creatives", page, () => {
      setCurrentPage(page);
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    });
  };

  const openMessageDialog = (item) => {
    setItem(item);
    setOpen(true);
  };

  const openNotesDialog = (item) => {
    setAppId(item.resource.id);
    setOpenNotes(true);
  };

  const removeFromShortlist = (id) => {
    let newPage = Math.ceil((meta?.total - 1) / 9);
    removeBookmark(id, () => {
      showAlert('Creative deleted from shortlist');
      paginate(currentPage <= newPage ? currentPage : newPage);
    });
  };

  const handleSearch = (searchText) => {
    setSearchPerformed(false);
    getBookmarks(searchText, user.uuid, "creatives", () => {
      setSearchPerformed(true);
    });
  }

  useEffect(() => {
    setSearchPerformed(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-creative-shortlist">
      <h3 className="page-title">Creatives Shortlist</h3>
      <div className="card">
        <h6>Search Creatives Shortlist</h6>
        <SearchBarCommon
          input={searchInput}
          setInput={setSearchInput}
          onSearch={handleSearch}
          placeholder={"Search Creatives Shortlist"}
          searchBoxClass="search-box-common search-box-black-gold"
        />
        {bookmarks?.length > 0 ? (
          <>
            {bookmarks && meta?.total > 9 ? <Paginate meta={meta} paginate={paginate} title={"shortlisted creatives"} /> : <br />}
            {bookmarks.map((item, index) => {
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
                          <Link to={"/creative/" + resource.slug}>
                            <CreativeImageLoader creative={resource} />
                          </Link>
                        </div>

                        <div className="candidate-info-content">
                          <div className="title-wrapper">
                            <h2 className="candidate-title">
                              <Link to={"/creative/" + resource.slug} className="link-dark">{resource.name}</Link>
                            </h2>
                            {/* {resource.priority.is_featured == 1 && (
                              <span
                                className="featured"
                                data-toggle="tooltip"
                                title=""
                                data-original-title="featured"
                              >
                                <TfiCheck strokeWidth="1" />
                              </span>
                            )} */}
                          </div>
                          <div className="job-metas">
                            <div className="candidate-category text-dark">
                              {resource.category}
                            </div>
                            <div className="candidate-location with-icon">
                              {resource.location?.state && (
                                <>
                                  <TfiLocationPin />
                                  <span className="restrict-location-search">{resource.location.state}</span>
                                </>
                              )}
                              {resource.location?.city && (
                                <>
                                  ,
                                  <span className="restrict-location-search"> {resource.location.city}</span>
                                </>
                              )}
                            </div>
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
                          <Link
                            onClick={(e) => {
                              if (subscription_status != "active") {
                                e.preventDefault();
                                showAlert("Post A Job for message capabilities");
                              } else {
                                openMessageDialog(item);
                              }
                            }}
                          >
                            <TfiEmail />
                          </Link>
                        </Tooltip>
                        <Tooltip title="Delete Candidate">
                          <Link onClick={() => removeFromShortlist(item.id)}>
                            <TfiClose />
                          </Link>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            )}
            {bookmarks && meta?.total > 9 && <Paginate meta={meta} paginate={paginate} title={"shortlisted creatives"} />}
          </>
        ) : (
          <div className="no_result">
            {searchInput?.length > 0 && searchPerformed && bookmarks?.length == 0 ? (
              <p>Please try again. No exact results found.</p>
            ) : (
              <DelayedOutput delay={5000}>
                <p>You have not shortlisted any creative yet.</p>
              </DelayedOutput>
            )}
          </div>
        )}
      </div>
      <Message
        open={open}
        handleClose={handleClose}
        item={item.resource}
        type="job"
      />
      <AddNotesModal
        open={openNotes}
        setOpen={setOpenNotes}
        handleClose={handleCloseNotes}
        resource_id={appId}
        type="creatives"
      />
    </div>
  );
};

export default CreativeShortlist;
