import { Link } from "react-router-dom";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/CreativeDashboard/AgencyShortlist.scss";
import { useContext, useEffect, useState } from "react";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { Context as DataContext } from "../../../context/DataContext";

const AgencyShortlist = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    state: { bookmarks },
    getBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="creative-page-agency-shortlist">
      <h3 className="page-title">Agencies Shortlist</h3>
      <div className="card">
        {bookmarks.length ? (
          bookmarks.map((item, index) => {
            const resource = item.resource;
            return (
              <div class="employer-list">
                <div class="row align-items-center justify-content-between">
                  <div class="col-12 d-flex align-items-top">
                    <div className="avatar employer">
                      <img
                        src={resource.logo || Placeholder}
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="meta row w-100 align-items-center">
                      <div className="col-md-8">
                        <div className="username">
                          <Link to={"/agency/" + resource.slug}>
                            {resource.name}
                          </Link>
                        </div>
                        <div className="user-meta">
                          {resource.location && (
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
                                  <>
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
                                  </>
                                )
                              )}
                            </div>
                          ) : ""}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="open-jobs-btn">
                          <Link to={`/agency/${resource.slug}`}>
                            Open Jobs - {resource.open_jobs}
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-1">
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
    </div>
  );
};

export default AgencyShortlist;
