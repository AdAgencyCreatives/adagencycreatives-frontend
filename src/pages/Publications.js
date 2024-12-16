import "../styles/Publications.css";
import { Context } from "../context/DataContext";
import { useContext, useEffect } from "react";
import { useScrollLoader } from "../hooks/useScrollLoader";

const Publications = () => {
  const {
    state: { publications, publicationsNextPage, loading },
    getPublications,
    loadNextPage
  } = useContext(Context);

  useEffect(() => {
    getPublications();
  }, []);

  const loadMore = () => {
    if (publicationsNextPage) loadNextPage(publicationsNextPage);
  };

  useScrollLoader(loading, loadMore);

  return (
    <div className="dark-container page-mentors mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">Publication Resources</h1>
        <p className="page-subtitle">
          Get in the know through the advertising industry trades.
        </p>
        <div className="row gy-md-1 gy-5 align-items-center">
          {publications.map((item, index) => {
            return (
              <div className="col-md-4 col-sm-6" key={`pb${index}`}>
                <div className="publications-slider">
                  <a href={item.link} target="_blank">
                    <img
                      src={item.preview_link}
                      className="publication-image"
                      width={100}
                      height={120}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="load-more text-center">
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
