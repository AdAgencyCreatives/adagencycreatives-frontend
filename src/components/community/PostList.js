import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import PostItem from "./PostItem";
import { useScrollLoader } from "../../hooks/useScrollLoader";

const PostList = (props) => {

  const [refreshPosts, setRefreshPosts] = useState({ num: 0 });

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { posts, post_added, post_updated, post_deleted, halt_refresh, nextPage, loading, },
    getPosts, loadPosts, resetPosts,
  } = useContext(CommunityContext);

  const loadMore = () => {
    if (nextPage) loadPosts(nextPage, props.feed_group);
  };

  useScrollLoader(loading, loadMore);

  useEffect(() => {
    if (halt_refresh) {
      return;
    }
    if (token) {
      if (props.feed_group && props.feed_group.length > 0) {
        getPosts(props.feed_group);
        console.log("Fetched Posts: " + (new Date())); // trick to force component re-render
      } else {
        //getFeedGroup();
      }
    }
  }, [token, props.feed_group, refreshPosts, post_added, post_updated, post_deleted, halt_refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshPosts((prevState) => {
        return {
          num: prevState.num + 1,
        };
      });
      // Reload posts after 10 seconds
    }, 15 * 1000);

    (async () => {
      await resetPosts();
    })();


    return () => clearInterval(interval);
  }, []);

  return (
    <div className="postlist">
      {posts &&
        posts.map((post, index) => (
          <PostItem key={post.id} post={post} refreshPosts={refreshPosts} />
        ))}
    </div>
  );
};

export default PostList;