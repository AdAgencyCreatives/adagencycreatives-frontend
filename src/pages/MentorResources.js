import "../styles/MentorResources.scss";
import AdAgency from "../assets/images/AdAgency.png";
import { Context } from "../context/DataContext";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SingleMentorList from "../components/SingleMentorList";
import { useScrollLoader } from "../hooks/useScrollLoader";

const MentorResources = () => {
  const { slug } = useParams();

  const {
    state: { mentors, resources, mentorsNextPage, resourcesNextPage, loading },
    getMentorTopics,
    getMentorResources,
    loadNextPage,
    getNextPageMentorResources
  } = useContext(Context);

  useEffect(() => {
    getMentorTopics(slug ?? '');
    if (slug) {
      getMentorResources(slug);
    }
  }, [slug]);

  const loadMore = () => {
    if (slug && resourcesNextPage) getNextPageMentorResources(resourcesNextPage, slug);
    if (!slug && mentorsNextPage) loadNextPage(mentorsNextPage);
  };

  useScrollLoader(loading, loadMore);

  return (
    <>
      {slug ? (
        <div className="dark-container page-single-mentor text-white mb-0 mt-4">
          <div className="container-fluid">
            <div className="mentor-wrapper">
              <h2 className="title">{mentors[0]?.title}</h2>
              <p className="subtitle" dangerouslySetInnerHTML={{ __html: mentors[0]?.description }}></p>
              <SingleMentorList items={resources} />
              <div className="load-more text-center mt-4">
                {loading && (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dark-container page-mentors mb-0 mt-4">
          <div className="container-fluid">
            <h1 className="community-title text-white text-center mb-1">Resources</h1>
            <p className="page-subtitle">
              Dedicated to the creatives out there giving back to our industry.
              <br />
              Click on a topic below.
            </p>
            <div className="row gy-5 mt-3">
              {mentors.map((item, index) => {
                return (
                  <div className="col-sm-4 mentor-container">
                    <Link to={`/mentoring-resources/${item.slug}`} className="mentor" key={`m_${index}`}>
                      <span>{item.title}</span>
                      <img src={AdAgency} height={150} width={150} alt="" />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="load-more text-center mt-4">
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorResources;
