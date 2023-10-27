import { useContext, useEffect } from "react";
import { Context as CommunityContext } from "../context/CommunityContext";

const usePosts = () => {
  const {
    state: { posts },
    getPosts,
  } = useContext(CommunityContext);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return posts;
};

export default usePosts;