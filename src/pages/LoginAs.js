import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import Loader from "../components/Loader";
import "../styles/Logout.scss";
import { Context } from "../context/AuthContext";

const LoginAs = () => {
  const { token } = useParams("token");

  const { state, verifyToken } = useContext(Context);

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (state.token) {
      window.location = "/";
    }
  }, [state.token]);

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
          {(state.formMessage?.type == "error") ? (
            <p style={{ color: "red" }}>Invalid token</p>
          ) : (
            <>
              <p>Logging in ...</p>
              <Loader fullHeight={false} />
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default LoginAs;
