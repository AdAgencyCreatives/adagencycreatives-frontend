import * as React from "react";
import { Context as AuthContext } from "./../../context/AuthContext";
import Creative from "./Creative";
import Agency from "./Agency";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { state } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state.token && !state.fetchingToken) {
      // If the user is not logged in, redirect to the Home page
      navigate("/login/" + encodeURIComponent(window.location.href) + "#login");
    }
  }, [state.token, navigate, state.fetchingToken]);

  if (!state.fetchingToken && !state.token) {
    return null;
  }

  return <>{state.role === "creative" ? <Creative /> : <Agency />}</>;
};

export default UserDashboard;
