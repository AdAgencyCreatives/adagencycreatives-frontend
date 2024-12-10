import { useContext, useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ForgotPassword from "./ForgotPassword";
import { Context as AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const AuthModal = ({ open, handleClose, form = "login", registerTab = "creative" }) => {

  const anchor = window.location.hash.slice(1);

  const [modal, setModal] = useState(form);
  const [openTab, setOpenTab] = useState(registerTab);
  const {
    state: { token },
    resetFormMessage
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    resetFormMessage();
  }, [modal, open]);

  useEffect(() => {
    if (!open) {
      setModal(form);
    }
  }, [open]);

  useEffect(() => {
    if (anchor && anchor.length && anchor.indexOf("register_") == 0 && !token) {
      setModal((anchor == "register_creative" || anchor == "register_agency") ? "register" : "login");
      setOpenTab((anchor == "register_creative" || anchor == "register_agency") ? anchor.replace("register_", "") : "creative");
    }
  }, [anchor]);

  if (token) {
    return <></>;
  }

  const closePopup = () => {
    let URL = String(window?.location?.pathname).replace("#register_creative", "");
    URL = String(window?.location?.pathname).replace("#register_agency", "");
    navigate(URL);
    handleClose();
  }

  return modal == "register" ? (
    <RegisterModal open={open} handleClose={closePopup} setModal={setModal} form={openTab} />
  ) : modal == "login" ? (
    <LoginModal open={open} handleClose={closePopup} setModal={setModal} />
  ) : modal == "reset" ? (
    <ForgotPassword open={open} handleClose={closePopup} setModal={setModal} />
  ) : (
    ""
  );
};

export default AuthModal;
