import { useContext, useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ForgotPassword from "./ForgotPassword";
import { Context as AuthContext } from "../../context/AuthContext";

const AuthModal = ({ open, handleClose, form = "login", registerTab = "creative" }) => {

  const anchor = window.location.hash.slice(1);

  const [modal, setModal] = useState(form);
  const [openTab, setOpenTab] = useState(registerTab);
  const { resetFormMessage } = useContext(AuthContext);

  useEffect(() => {
    resetFormMessage();
  }, [modal, open]);

  useEffect(() => {
    if (!open) {
      setModal(form);
    }
  }, [open]);

  useEffect(() => {
    if(anchor && anchor.length && anchor.indexOf("register_") == 0) {
      setModal((anchor == "register_creative" || anchor == "register_agency") ? "register" : "login");
      setOpenTab((anchor == "register_creative" || anchor == "register_agency") ? anchor.replace("register_", "") : "creative");
    }
  }, [anchor]);

  return modal == "register" ? (
    <RegisterModal open={open} handleClose={handleClose} setModal={setModal} form={openTab} />
  ) : modal == "login" ? (
    <LoginModal open={open} handleClose={handleClose} setModal={setModal} />
  ) : modal == "reset" ? (
    <ForgotPassword open={open} handleClose={handleClose} setModal={setModal} />
  ) : (
    ""
  );
};

export default AuthModal;
