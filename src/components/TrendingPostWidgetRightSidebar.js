import { useState, useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import TimeAgo from "./TimeAgo";
import { IoTimeOutline } from "react-icons/io5";
import UtcToLocalDateTime from "./UtcToLocalDateTime";
import PostImageLoader from "./PostImageLoader";

const TrendingPostWidgetRightSidebar = (props) => {
  const [defaultAvatar, setDefaultAvatar] = useState(
    "https://api.adagencycreatives.com/assets/img/placeholder.png"
  );

  function trimContent(content) {
    var el = document.createElement('div');
    el.innerHTML = content;
    var text = el.innerText;
    const limit = 5;
    const words = text.split(" ");
    const trimmed = words.slice(0, limit).join(" ");
    console.log();
    return words.length > limit ? `${trimmed}...` : trimmed;
  }

  return (
    <li className="vcard">
      <div className="item-avatar">
        <a href={"/creative/" + props.trending_post.author_slug}>
          <PostImageLoader post={props.trending_post} width={40} height={40} />
        </a>
      </div>
      <div className="item">
        <div className="item-title fn">
          <a href={"/creative/" + props.trending_post.author_slug}>
            {props.trending_post.author}
          </a>
          <div className="item-content" dangerouslySetInnerHTML={{ __html: trimContent(props.trending_post.content) }}></div>
        </div>
        <div className="item-meta">
          <div className="post-time">
            <IoTimeOutline />
            <TimeAgo datetime={props.trending_post.updated_at} />
            {/* ,&nbsp; */}
            {/* <UtcToLocalDateTime datetime={props.trending_post.updated_at} /> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default TrendingPostWidgetRightSidebar;
