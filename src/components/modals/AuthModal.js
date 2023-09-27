import { useContext, useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { Context as AuthContext } from "../../context/AuthContext";

const AuthModal = ({ open, handleClose }) => {
  const [modal, setModal] = useState("register");
  const {resetFormMessage} = useContext(AuthContext)

  
  useEffect(() => {
    resetFormMessage()
  },[modal])


  return modal == "register" ? (
    <RegisterModal open={open} handleClose={handleClose} setModal={setModal} />
  ) : (
    <LoginModal open={open} handleClose={handleClose} setModal={setModal} />
  );
};

export default AuthModal;
