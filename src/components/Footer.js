import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaInstagram, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const instagram = "https://www.instagram.com/adagencycreativescommunity";
  const linkedIn = "https://www.linkedin.com/company/adagencycreatives";
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="footer-title">Gather. Inspire. Do Cool $#*t!</h3>
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
                <p>© 2023 Ad Agency Creatives. All Rights Reserved.</p>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-and-conditions">User Agreement</Link>
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
