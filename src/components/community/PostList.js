import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import PostItem from "./PostItem";
import { useScrollLoader } from "../../hooks/useScrollLoader";

const PostList = () => {

  const [refreshPosts, setRefreshPosts] = useState({ num: 0 });

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { posts, feed_group, post_added, post_updated, post_deleted, halt_refresh, nextPage, loading, },
    getPosts, getFeedGroup, loadPosts,
  } = useContext(CommunityContext);

  const loadMore = () => {
    if (nextPage) loadPosts(nextPage, feed_group);
  };

  useScrollLoader(loading, loadMore);

  useEffect(() => {
    if(halt_refresh) {
      return;
    }
    if (token) {
      if (feed_group && feed_group.length > 0) {
        getPosts(feed_group);
        console.log("Fetched Posts: " + (new Date())); // trick to force component re-render
      } else {
        getFeedGroup();
      }
    }
  }, [token, feed_group, refreshPosts, post_added, post_updated, post_deleted, halt_refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshPosts((prevState) => {
        return {
          num: prevState.num + 1,
        };
      });
      // Reload posts after 10 seconds
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="postlist">
      {posts &&
        posts.map((item, index) => (
          <PostItem key={item.id} post={item} refreshPosts={refreshPosts} />
        ))}
    </div>
  );
};

export default PostList;