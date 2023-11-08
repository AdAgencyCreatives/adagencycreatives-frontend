import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/CreativesContext";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import "yet-another-react-lightbox/styles.css";

const Portfolio = ({ id }) => {
  const {
    state: { portfolio_items },
    getPortfolio,
  } = useContext(Context);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    getPortfolio(id);
  }, [id]);

  console.log(
    portfolio_items.map((item) => ({
      src: item.url,
      height: 100,
      width: 200,
    }))
  );

  return (
    <div className="content-section">
      <h1 className="content-title mt-0">Portfolio</h1>
      <p className="content">
        {portfolio_items.length > 0 && (
          <>
            <PhotoAlbum
              layout="rows"
              slides={portfolio_items.map((item) => ({
                src: item.url,
                height: 100,
                width: 200,
              }))}
              targetRowHeight={150}
              onClick={({ index: current }) => setIndex(current)}
            />
            <Lightbox
              slides={portfolio_items.map((item) => ({
                src: item.url,
                height: 100,
                width: 200,
              }))}
              index={index}
              open={index >= 0}
            />
          </>
        )}
      </p>
    </div>
  );
};

export default Portfolio;
