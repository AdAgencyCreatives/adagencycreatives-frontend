import { useContext } from "react";
import { Context } from "../../../context/CreativesContext";
import { useEffect } from "react";
import Placeholder from "../../../assets/images/placeholder.png";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const RelatedCreatives = ({ data }) => {
  const {
    state: { creatives },
    getRelatedCreatives,
  } = useContext(Context);

  useEffect(() => {
    getRelatedCreatives(data.title);
  }, [data]);
  return (
    <div className="realted-creatives-list-container">
      {creatives &&
        creatives.map((item) => (
          <div className="job-item" key={item.id}>
            <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
              <div className="inner-left">
                <div className="employer-logo">
                  <Link to={"/job/" + item.slug}>
                    <img
                      width="150"
                      height="150"
                      src={item.profile_image || Placeholder}
                      className=""
                      alt=""
                    />
                  </Link>
                </div>
                <div className="meta row w-100 align-items-center">
                  <div className="job-list-content col-md-8">
                    <div className="title-wrapper flex-middle-sm">
                      <h5 className="employer-name mb-0">
                        <Link
                          className="link-dark"
                          to={"/creative/" + item.slug}
                        >
                          {item.name}
                        </Link>
                      </h5>
                      <h2 className="job-title">
                        <Link to={"/creative-category/" + item.category}>
                          {item.title}
                        </Link>
                      </h2>
                    </div>
                    <div className="job-metas">
                      <div className="d-flex flex-wrap">
                        {item.location.state && (
                          <div className="job-location location">
                            <IoLocationOutline />
                            <Link
                              to={`/creative-location/${item.location.state}`}
                            >
                              {item.location.state},&nbsp;
                            </Link>
                            <Link
                              to={`/creative-location/${item.location.city}`}
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
        ))}
    </div>
  );
};

export default RelatedCreatives;
