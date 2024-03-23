import { useState, useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import TimeAgo from "./TimeAgo";
import { IoTimeOutline } from "react-icons/io5";
import UtcToLocalDateTime from "./UtcToLocalDateTime";

const TrendingPostWidgetRightSidebar = (props) => {
  const [defaultAvatar, setDefaultAvatar] = useState(
    "https://adagencycreatives.noorsofttechdev.com/static/media/placeholder.12b7e9aaed5e5566bc6a.png"
  );

  const {
    state: { single_creative, creative_experience },
    getCreativeById,
  } = useContext(CreativesContext);

  useEffect(() => {
    getCreativeById(props.trending_post.user_id);
  }, []);

  function trimContent(content) {
    var el = document.createElement('div');
    el.innerHTML = content;
    var text = el.innerText;
    const limit = 5;
    const words = text.split(" ");
    const trimmed = words.slice(0, limit).join(" ");
    return words.length > limit ? `${trimmed}...` : trimmed;
  }

  return (
    <li className="vcard">
      <div className="item-avatar">
        <a href={"/creative/" + props.trending_post.author_slug}>
          <img
            data-src={props.trending_post.author_avatar || defaultAvatar}
            width="50"
            height="50"
            alt={"Profile avatar of " + props.trending_post.author}
            className="avatar ls-is-cached lazyloaded"
            src={props.trending_post.author_avatar || defaultAvatar}
          />
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
