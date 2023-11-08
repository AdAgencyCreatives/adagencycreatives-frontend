import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/CreativesContext";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { IoAddCircle } from "react-icons/io5";
import { Fullscreen, Zoom } from "yet-another-react-lightbox/plugins";

const Portfolio = ({ id }) => {
  const {
    state: { portfolio_items },
    getPortfolio,
  } = useContext(Context);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    getPortfolio(id);
  }, [id]);

  return portfolio_items.length > 0 && (
    <div className="content-section mb-5">
      <h1 className="content-title mt-0">Portfolio</h1>
      <div className="content">
        <PhotoAlbum
          layout="columns"
          photos={portfolio_items.map((item) => ({
            src: item.url,
            height: 170,
            width: 170,
          }))}
          spacing={30}
          onClick={({ index: current }) => setIndex(current)}
          renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => {
            let current = portfolio_items.findIndex(
              (item) => item.url == photo.src
            );
            return (
              <div
                style={{ position: "relative", ...wrapperStyle }}
                className="portfolio-item"
              >
                {renderDefaultPhoto({ wrapped: true })}
                <div className="overlay" onClick={() => setIndex(current)}>
                  <IoAddCircle />
                </div>
              </div>
            );
          }}
        />
        <Lightbox
          plugins={[Fullscreen, Zoom]}
          slides={portfolio_items.map((item) => ({
            src: item.url,
          }))}
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>
    </div>
  );
};

export default Portfolio;
