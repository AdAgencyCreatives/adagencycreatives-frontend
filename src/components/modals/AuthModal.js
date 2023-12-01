import { useContext, useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ForgotPassword from "./ForgotPassword";
import { Context as AuthContext } from "../../context/AuthContext";

const AuthModal = ({ open, handleClose, form = "login", registerTab = "creative" }) => {
  const [modal, setModal] = useState(form);
  const { resetFormMessage } = useContext(AuthContext);

  useEffect(() => {
    resetFormMessage();
  }, [modal, open]);

  useEffect(() => {
    if (!open) {
      setModal(form);
    }
  }, [open]);

  return modal == "register" ? (
    <RegisterModal open={open} handleClose={handleClose} setModal={setModal} form={registerTab} />
  ) : modal == "login" ? (
    <LoginModal open={open} handleClose={handleClose} setModal={setModal} />
  ) : modal == "reset" ? (
    <ForgotPassword open={open} handleClose={handleClose} setModal={setModal} />
  ) : (
    ""
  );
};

export default AuthModal;
