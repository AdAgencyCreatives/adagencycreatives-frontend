import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaInstagram, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import usePageDataHelper from "../hooks/usePageDataHelper";
import useHelper from "../hooks/useHelper";

const Footer = () => {

  const { validateAccess } = useHelper();

  const instagram = "https://www.instagram.com/adagencycreativescommunity";
  const linkedIn = "https://www.linkedin.com/company/adagencycreatives";

  const { pageData, getPageDataItem } = usePageDataHelper("footer");
  const { pageData: homePageData, getPageDataItem: getHomePageDataItem } = usePageDataHelper("home");

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <h3 className="footer-title" dangerouslySetInnerHTML={{ __html: getPageDataItem("title", pageData) }}></h3> */}
            <div>
              <p className="subHeading motive">
                <Link className="" to={"/community"} dangerouslySetInnerHTML={{ __html: getHomePageDataItem('motive_title_gather', homePageData) }}
                  onClick={(e) =>
                    validateAccess(e, {
                      roles: ["admin", "creative"],
                      restrictedMessage: "Please login as a Creative to access",
                    })
                  }></Link>
                <Link className="" to={"/mentoring-resources"} dangerouslySetInnerHTML={{ __html: getHomePageDataItem('motive_title_inspire', homePageData) }}></Link>
                <Link className="" to={"/creative-jobs"} dangerouslySetInnerHTML={{ __html: getHomePageDataItem('motive_title_do_cool_shit', homePageData) }}></Link>
              </p>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-4">
              <a href={linkedIn} className="social" target="__blank">
                <FaLinkedinIn />
              </a>
              <a href={instagram} className="social" target="__blank">
                <FaInstagramSquare />
              </a>
            </div>
            <div className="copyrights">
              <div className="d-flex justify-content-center flex-wrap">
                <p>© {(new Date()).getFullYear()} Ad Agency Creatives. All Rights Reserved.</p>
                <Link to="/privacy-policy" reloadDocument>Privacy Policy</Link>
                <Link to="/terms-and-conditions" reloadDocument>User Agreement</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
