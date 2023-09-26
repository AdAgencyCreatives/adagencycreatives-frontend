import { useState } from "react";
import RegisterModal from './RegisterModal'
import LoginModal from "./LoginModal";
// import LoginModal from './LoginModal'

const AuthModal = ({ open, handleClose }) => {

  const [modal,setModal] = useState("register");
  return modal == "register" ? <RegisterModal  open={open} handleClose={handleClose} setModal={setModal}/> : <LoginModal  open={open} handleClose={handleClose} setModal={setModal} />;
};

export default AuthModal;
