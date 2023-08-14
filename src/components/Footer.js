import "../styles/Footer.css";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const linkedIn = "https://www.linkedin.com/company/adagencycreatives";
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="footer-title">Gather. Inspire. Do Cool S#*t!</h3>
            <a href={linkedIn} className="social">
              <FaLinkedinIn />
            </a>

            <div className="copyrights">
              <p>
                {" "}
                © 2023 Ad Agency Creatives. All Rights Reserved.
                <a href="#">Privacy Policy</a>
                <a href="#">User Agreement</a>
                <a href="#">Contact Us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
