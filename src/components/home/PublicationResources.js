import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Context } from "../../context/DataContext";
import { useContext, useEffect } from "react";

const PublicationResources = () => {
  const {
    state: { publications },
    getPublications
  } = useContext(Context);

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <div id="publications">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Publication Resources</h1>
        <div>
          <Link className="browseAll" to="publication-resources">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
      {/* Slides */}
      <div className="sectionContent publication-section">
        <div className="container-fluid px-3 py-4">
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
      </div>
    </div>
  );
};

export default PublicationResources;
