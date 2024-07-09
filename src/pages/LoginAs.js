import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import Loader from "../components/Loader";
import "../styles/Logout.scss";
import { Context } from "../context/AuthContext";

import { useNavigate } from 'react-router-dom';


const LoginAs = () => {

  const navigate = useNavigate();

  const { token } = useParams("token");

  const { state, verifyToken } = useContext(Context);

  useEffect(() => {
    if (token) {
      verifyToken(token)
        .then((result) => {
          let data = result.data;
          if (data?.user?.role?.length > 0) {
            if (data.user.role == 'creative') {
              navigate('/community');
            } else if (data.user.role == 'agency' || data.user.role == 'advisor' || data.user.role == 'recruiter') {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          }
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [token]);

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
          {state.formMessage?.type == "error" ? (
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
