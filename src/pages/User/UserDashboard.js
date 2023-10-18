import * as React from "react";
import { Context as AuthContext } from "./../../context/AuthContext";
import Creative from "./Creative";
import Agency from "./Agency";

const UserDashboard = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <>
    {state.role === "creative" ? (
      <Creative />
    ) : (
      <Agency />
    )}
    </>
  );
}

export default UserDashboard;
