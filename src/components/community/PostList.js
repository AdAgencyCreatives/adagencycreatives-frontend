import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import PostItem from "./PostItem";
import { useScrollLoader } from "../../hooks/useScrollLoader";

const PostList = (props) => {
  const [refreshPosts, setRefreshPosts] = useState({ num: 0 });
  const [loaded, setLoaded] = useState(false);

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
    setLoaded(true);
  }, [posts]);

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

  const resetPostReactionDropdowns = (e) => {
    const ignoreKey = document?.currentPostReactionKey || "";
    const arr = document.getElementsByClassName('post-reaction-dropdown');
    if (arr?.length) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const key = element['id'] || "";
        if (key?.length && key == ignoreKey) {
          continue;
        }
        element?.classList?.remove('d-show');
        element?.classList?.add('d-none');
      }
    }
  };

  const resetPostReactionActionDropdowns = (e) => {
    const ignoreKey = document?.currentPostReactionActionKey || "";
    const arr = document.getElementsByClassName('post-reaction-action-dropdown');
    if (arr?.length) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const key = element['id'] || "";
        if (key?.length && key == ignoreKey) {
          continue;
        }
        element?.classList?.remove('d-show');
        element?.classList?.add('d-none');
      }
    }
  };

  const resetPostReactionStatsReactionsBy = (e) => {
    let elems = document.getElementsByClassName('reaction-by-list');
    if (elems?.length > 0) {
      for (let index = 0; index < elems.length; index++) {
        const el = elems[index];
        el.classList.remove('d-flex');
        el.classList.add('d-none');
      }
    }
  };

  const resetDropdowns = (e) => {
    resetPostReactionDropdowns(e);
    resetPostReactionActionDropdowns(e);
    resetPostReactionStatsReactionsBy(e);
  };

  const onDocumentMouseDown = (e) => {
    resetDropdowns(e);
  };

  if (!document.hasOnDocumentMouseDown) {
    document.addEventListener('mousedown', onDocumentMouseDown);
    document.hasOnDocumentMouseDown = true;

  }

  if (!loaded) {
    return <></>;
  }

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