import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/CreativesContext";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import { IoAddCircle } from "react-icons/io5";
import { Fullscreen, Zoom } from "yet-another-react-lightbox/plugins";

const Portfolio = ({ isOwnProfile = false, portfolio_items }) => {

  const SNEAK_PEEK_LIMIT = 3;
  const [expandSneakPeak, setExpandSneakPeak] = useState(false);

  const [index, setIndex] = useState(-1);

  const portfolio_items_render = portfolio_items.slice(0, expandSneakPeak ? portfolio_items.length : Math.min(portfolio_items.length, SNEAK_PEEK_LIMIT));

  return (isOwnProfile ? true : portfolio_items_render.length > 0) && (
    <div className="content-section mb-5">
      <h1 className="content-title mt-0">Sneak Peek</h1>
      {portfolio_items_render.length > 0 && (<>
        <div className="content">
          <PhotoAlbum
            layout="rows"
            photos={portfolio_items_render.map((item) => ({
              src: item,
              height: 170,
              width: 170,
            }))}
            spacing={20}
            onClick={({ index: current }) => setIndex(current)}
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => {
              let current = portfolio_items_render.findIndex(
                (item) => item == photo.src
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
          {portfolio_items_render.length < portfolio_items.length && (
            <button className="btn btn-dark hover-gold mt-3" onClick={() => setExpandSneakPeak(!expandSneakPeak)}>
              {expandSneakPeak ? "Show Less" : "Show More"}
            </button>
          )}
          <Lightbox
            plugins={[Fullscreen, Zoom]}
            slides={portfolio_items.map((item) => ({
              src: item,
            }))}
            index={index}
            open={index >= 0}
            close={() => setIndex(-1)}
          />
        </div>
      </>)}
    </div>
  );
};

export default Portfolio;
