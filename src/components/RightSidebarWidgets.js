import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/RightSidebarWidgets.scss';

const RightSidebarWidgets = () => {
  return (
    <div className="right-sidebar">
      <div className="widgets">

        {/* Calendar */}
        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">Upcoming Events</div>
          </div>
          <div className="widget-content">
            <Calendar />
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">Welcome New Members</div>
          </div>
          <div className="widget-content">
            <div className="content">
              <ul
                id="members-list"
                className="item-list"
                aria-live="polite"
                aria-relevant="all"
                aria-atomic="true"
              >
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/demo-creative-1/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/04/AAC-Logo-for-Community-150x150.png"
                        width="50"
                        height="50"
                        alt="Profile picture of Ad Agency Creatives"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/04/AAC-Logo-for-Community-150x150.png"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/demo-creative-1/">
                        Ad Agency Creatives
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">42 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/cassidy-fletcher/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/IMG_2814-150x150.jpeg"
                        width="50"
                        height="50"
                        alt="Profile picture of Cassidy Fletcher"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/IMG_2814-150x150.jpeg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/cassidy-fletcher/">
                        Cassidy Fletcher
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">7 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/shreyarege08/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/07/IMG_7512-150x150.jpg"
                        width="50"
                        height="50"
                        alt="Profile picture of Shreya Rege"
                        className="avatar lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/07/IMG_7512-150x150.jpg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/shreyarege08/">
                        Shreya Rege
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/kenny/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/NewLIProf-150x150.jpeg"
                        width="50"
                        height="50"
                        alt="Profile picture of Kenny Friedman"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/NewLIProf-150x150.jpeg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/kenny/">
                        Kenny Friedman
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/david-nigh/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/06/profile-pic-150x150.jpg"
                        width="50"
                        height="50"
                        alt="Profile picture of David Nigh"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/06/profile-pic-150x150.jpg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/david-nigh/">
                        David Nigh
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">Trending Post</div>
          </div>
          <div className="widget-content">
            <div className="content">
              <ul
                id="members-list"
                className="item-list"
                aria-live="polite"
                aria-relevant="all"
                aria-atomic="true"
              >
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/demo-creative-1/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/04/AAC-Logo-for-Community-150x150.png"
                        width="50"
                        height="50"
                        alt="Profile picture of Ad Agency Creatives"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/04/AAC-Logo-for-Community-150x150.png"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/demo-creative-1/">
                        Ad Agency Creatives
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">42 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/cassidy-fletcher/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/IMG_2814-150x150.jpeg"
                        width="50"
                        height="50"
                        alt="Profile picture of Cassidy Fletcher"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/IMG_2814-150x150.jpeg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/cassidy-fletcher/">
                        Cassidy Fletcher
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">7 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/shreyarege08/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/07/IMG_7512-150x150.jpg"
                        width="50"
                        height="50"
                        alt="Profile picture of Shreya Rege"
                        className="avatar lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/07/IMG_7512-150x150.jpg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/shreyarege08/">
                        Shreya Rege
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/kenny/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/NewLIProf-150x150.jpeg"
                        width="50"
                        height="50"
                        alt="Profile picture of Kenny Friedman"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/05/NewLIProf-150x150.jpeg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/kenny/">
                        Kenny Friedman
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
                <li className="vcard">
                  <div className="item-avatar">
                    <a href="https://adagencycreatives.com/david-nigh/">
                      <img
                        data-src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/06/profile-pic-150x150.jpg"
                        width="50"
                        height="50"
                        alt="Profile picture of David Nigh"
                        className="avatar ls-is-cached lazyloaded"
                        src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_candidate_featured_image/2023/06/profile-pic-150x150.jpg"
                      />
                    </a>
                  </div>

                  <div className="item">
                    <div className="item-title fn">
                      <a href="https://adagencycreatives.com/david-nigh/">
                        David Nigh
                      </a>
                    </div>
                    <div className="item-meta">
                      <span className="activity">2 friends</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebarWidgets;
