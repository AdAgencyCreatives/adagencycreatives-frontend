import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { Dialog } from "@mui/material";
import Loader from "../components/Loader";
import "../styles/Logout.scss";

const Logout = () => {
  const { logout } = useContext(Context);

  useEffect(() => {
    logout(() => {
      window.location = "/";
    });
  }, []);

  return (
    <>
      <div className="logout-back">...</div>
      <Dialog
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        scroll="body"
      >
        <div className="logout-modal">
          <p>Logging Out ...</p>
          <Loader fullHeight={false} />
        </div>
      </Dialog>
    </>
  );
};

export default Logout;
