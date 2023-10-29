import { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import PostItem from "./PostItem";

const PostList = () => {

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { posts },
    getPosts,
  } = useContext(CommunityContext);

  useEffect(() => {
    if (token) {
      getPosts();
    }
  }, [token]);
  
  return (
    <div className="postlist">
      {posts &&
        posts.map((item, index) => (
          <PostItem key={item.id} post={item} />
        ))}
    </div>
  );
};

export default PostList;