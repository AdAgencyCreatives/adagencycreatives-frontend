import { Link } from "react-router-dom";
import Avatar from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../../../styles/AgencyDashboard/CreativeShortlist.scss";
import {
  TfiEye,
  TfiEmail,
  TfiClose,
  TfiCheck,
  TfiLocationPin,
} from "react-icons/tfi";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Message from "../../../components/agency/dashboard/Modals/Message";
import { Context as DataContext } from "../../../context/DataContext";

const CreativeShortlist = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    state: { bookmarks },
    getBookmarks,
  } = useContext(DataContext);

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="agency-page-creative-shortlist">
      <h3 className="page-title">Creatives Shortlist</h3>
      <div className="card">
        {bookmarks.length ? (
          bookmarks.map((value, index) => (
            <div class="candidate-list candidate-archive-layout">
              <div class="d-flex align-items-center flex-wrap">
                <div class="candidate-info">
                  <div class="d-flex align-items-center gap-4">
                    <div class="candidate-logo">
                      <Link>
                        <img width="150" height="150" src={Avatar} alt="" />
                      </Link>
                    </div>

                    <div class="candidate-info-content">
                      <div class="title-wrapper">
                        <h2 class="candidate-title">
                          <Link className="link-dark">Phil Neves</Link>
                        </h2>

                        <span
                          class="featured"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="featured"
                        >
                          <TfiCheck strokeWidth="1" />
                        </span>
                      </div>
                      <div class="job-metas">
                        <div class="candidate-category">
                          <Link>Creative Director Art Director</Link>
                        </div>
                        <div class="candidate-location with-icon">
                          <TfiLocationPin />
                          <span class="restrict-location-search">Miami</span>,
                          <span class="restrict-location-search">Florida</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ali-right">
                  <div class="action-button">
                    <Tooltip title="View Profile">
                      <Link to="#">
                        <TfiEye />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Send Message">
                      <Link to="#" onClick={() => setOpen(true)}>
                        <TfiEmail />
                      </Link>
                    </Tooltip>
                    <Message open={open} handleClose={handleClose} />

                    <Tooltip title="Delete Candidate">
                      <Link to="#">
                        <TfiClose />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="fs-5">There are no Creatives in your shortlist.</p>
        )}
      </div>
    </div>
  );
};

export default CreativeShortlist;
