import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";

import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";

import RestrictedLounge from "../components/RestrictedLounge";
import usePageDataHelper from "../hooks/usePageDataHelper";
import DelayedOutput from "../components/DelayedOutput";
import Calendar from "react-calendar";
import Loader from "../components/Loader";

const Community = () => {
  const { pageData, getPageDataItem } = usePageDataHelper("community");
  const [loaded, setLoaded] = useState(false);

  const feed_group = "715bfe90-833e-3459-9700-036ac28d3fd4";
  const {
    state: { token, role },
  } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  return (
    <>
      <div className="dark-container page-community mb-0 mt-0">
        <DelayedOutput>
          <h1 className="community-title" dangerouslySetInnerHTML={{ __html: getPageDataItem('title', pageData) }}></h1>
          <h2 className="community-subtitle" dangerouslySetInnerHTML={{ __html: getPageDataItem('sub_title', pageData) }}></h2>
        </DelayedOutput>
        <div className="container-fluid mt-4 px-2 px-md-5">
          {!token || !role || (role != "admin" && role != "creative") ? (
            <>
              {loaded ? (
                <div className="col-md-7 order-md-2 order-2 mx-auto">
                  <div className="container-fluid mt-4">
                    <div className="row">
                      <div className="col-md-12 mb-4 mb-md-0">
                        <div className="restricted-creatives-only">
                          <div className="restricted-message">
                            {/* <h4>The Lounge is restricted for Creatives only.</h4>
                            <h5>Please login as a Creative to access The Lounge.</h5> */}
                            <h5>A creative login is required for access.</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Loader fullHeight={false} />
                </>
              )}
            </>
          ) : (
            <div className="row div_row">
              <div className="col-md-2 mb-4 mb-lg-0 menu_left">
                <CreatePost className="post-form mobile-displayed mb-4" feed_group={feed_group} />
                <LeftSidebar />
              </div>
              <div className="col-md-7 order-lg-2 order-3 div_content_center">
                {/* <div className="right-sidebar mobile-displayed">
                  <div className="widgets">
                    <div className="widget">
                      <div className="widget-content mt-0">
                        <Calendar />
                      </div>
                    </div>
                  </div>
                </div> */}
                <CreatePost className="post-form mobile-hidden" feed_group={feed_group} />
                <PostList feed_group={feed_group} />
              </div>
              <div className="col-md-3 order-lg-3 order-2 sidebar_right">
                <RightSidebarWidgets />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Community;
