import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import PostItem from "./PostItem";

const PostList = () => {

  const [refreshPosts, setRefreshPosts] = useState({ num: 0 });

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { posts, feed_group },
    getPosts, getFeedGroup,
  } = useContext(CommunityContext);

  useEffect(() => {
    if (token) {
      if (feed_group && feed_group.length > 0) {
        getPosts(feed_group);
        console.log("Fetched Posts: " + (new Date())); // trick to force component re-render
      } else {
        getFeedGroup();
      }

    }
  }, [token, feed_group, refreshPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshPosts((prevState) => {
        return {
          num: prevState.num + 1,
        };
      });
      // Reload posts after 60 seconds
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