import {
  IoPersonOutline,
} from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/RightSidebarWidgets.scss";
import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as CommunityContext } from "../context/CommunityContext";
import TrendingPostWidgetRightSidebar from "./TrendingPostWidgetRightSidebar";
import NewMemberWidgetRightSidebar from "./NewMemberWidgetRightSidebar";

const RightSidebarWidgets = () => {

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { new_members, feed_group, trending_posts },
    getNewMembers, getTrendingPosts,
  } = useContext(CommunityContext);

  useEffect(() => {
    if (token) {
      getNewMembers();
      getTrendingPosts();
    }
  }, [token]);

  return (
    <div className="right-sidebar">
      <div className="widgets">
        {/* Calendar */}
        <div className="widget">
          <div className="widget-content mt-0">
            <Calendar />
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">
              Welcome New Members
            </div>
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
                {new_members &&
                  new_members.slice(0, Math.min(5, new_members.length)).map((item, index) => (
                    <NewMemberWidgetRightSidebar key={"new-member-widget-" + item.id} new_member={item} />
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <div className="widget-title">Trending Posts</div>
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
                {trending_posts &&
                  trending_posts.slice(0, Math.min(5, trending_posts.length)).map((item, index) => (
                    <TrendingPostWidgetRightSidebar key={"trending-post-widget-" + item.id} trending_post={item} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebarWidgets;
