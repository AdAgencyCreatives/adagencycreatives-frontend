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

const Community = () => {
  const { pageData, getPateDataItem } = usePageDataHelper("community");
  const [loaded, setLoaded] = useState(false);

  const feed_group = "715bfe90-833e-3459-9700-036ac28d3fd4";
  const {
    state: { token, role },
  } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  return (
    <>
      <div className="dark-container page-community mb-0 mt-0">
        <DelayedOutput>
          <h1 className="community-title" dangerouslySetInnerHTML={{ __html: getPateDataItem('title', pageData) }}></h1>
          <h2 className="community-subtitle" dangerouslySetInnerHTML={{ __html: getPateDataItem('sub_title', pageData) }}></h2>
        </DelayedOutput>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-2 mb-4 mb-md-0">
              <LeftSidebar />
            </div>
            {!token && !role && (role != "admin" || role != "creative") ? (
              <>
                {loaded ? (
                  <div className="col-md-7 order-md-2 order-2">
                    <div className="container-fluid mt-4">
                      <div className="row">
                        <div className="col-md-12 mb-4 mb-md-0">
                          <div className="restricted-creatives-only">
                            <div className="restricted-message">
                              <h4>The Lounge is restricted for creatives only.</h4>
                              <h5>Please login as a creative to access the lounge.</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-7 order-md-2 order-2"></div>
                )}
              </>
            ) : (
              <div className="col-md-7 order-md-2 order-2">
                <div className="right-sidebar mobile-displayed">
                  <div className="widgets">
                    <div className="widget">
                      <div className="widget-content mt-0">
                        <Calendar />
                      </div>
                    </div>
                  </div>
                </div>
                <CreatePost feed_group={feed_group} />
                <PostList feed_group={feed_group} />
              </div>
            )}
            <div className="col-md-3 order-md-3 order-3">
              <RightSidebarWidgets />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
