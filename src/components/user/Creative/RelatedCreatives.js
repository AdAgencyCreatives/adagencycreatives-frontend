import { useContext, useState } from "react";
import { Context } from "../../../context/CreativesContext";
import { useEffect } from "react";
import Placeholder from "../../../assets/images/placeholder.png";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../../context/AuthContext";

const RelatedCreatives = ({ data }) => {
  const [relatedCreatives, setRelatedCreatives] = useState([]);
  const {
    state: { creatives },
    getRelatedCreatives,
  } = useContext(Context);

  const {
    state: {
      role,
    },
  } = useContext(AuthContext);

  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";

  useEffect(() => {
    getRelatedCreatives(data.user_id);
  }, [data]);

  useEffect(() => {
    if (creatives && creatives.length) {
      setRelatedCreatives(
        creatives.filter((item) => item.user_id != data.user_id)
      );
    }
  }, [creatives, data]);

  return (
    relatedCreatives.length > 0 && (
      <div className="realted-creatives-list-container">
        <div className="fs-4 mb-4">Related Creatives</div>
        {relatedCreatives.map((item) => {
          if (item.user_id == data.user_id) return <></>;
          return (
            <div className="job-item" key={item.id}>
              <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                <div className="inner-left">
                  <div className="">
                    <Link to={"/job/" + item.slug}>
                      <img
                        width="150"
                        height="150"
                        src={item.profile_image || Placeholder}
                        className="candidateLogo"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="meta row w-100 align-items-center">
                    <div className="job-list-content col-md-8">
                      <div className="title-wrapper flex-middle-sm mb-1">
                        <h5 className="employer-name mb-1">
                          <Link
                            className="link-dark"
                            to={"/creative/" + item.slug}
                          >
                            {item.name}
                          </Link>
                        </h5>
                        <h2 className="employer-title mb-0">
                          <Link to={"/creative-category/" + item.category}>
                            {item.category}
                          </Link>
                        </h2>
                      </div>
                      <div className="job-metas">
                        <div className="d-flex flex-wrap">
                          {item.location.state && (
                            <div className="job-location location">
                              {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                              <Link
                                to={`/creatives/location/state/${item.location.state}`}
                              >
                                {item.location.state}
                              </Link>
                              {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                              <Link
                                to={`/creatives/search/city/${item.location.city}`}
                              >
                                {item.location.city}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                        <Link
                          to={"/creative/" + item.slug}
                          target="_blank"
                          className="btn btn-apply btn-apply-job-external "
                        >
                          View Profile
                          <i className="next flaticon-right-arrow"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default RelatedCreatives;
