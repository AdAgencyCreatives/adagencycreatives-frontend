import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const Loader = ({ fullHeight = true, customMessage = "Nothing here, refreshing page may work." }) => {

  const [showRefreshMessage, setShowRefreshMessage] = useState(false);
  const height = fullHeight ? "100vh" : "100%";

  useEffect(() => {
    setShowRefreshMessage(false);
    window.setTimeout(function () {
      setShowRefreshMessage(true);
    }, 90000); // wait for 90 seconds
  }, []);

  return (
    <div className="loader" style={{ height }}>
      {showRefreshMessage ? (<>
        <b>{customMessage}</b>
      </>) : (<>
        <CircularProgress />
      </>)}

    </div>
  );
};

export default Loader;
