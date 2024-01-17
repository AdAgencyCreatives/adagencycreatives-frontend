import { useContext, useEffect, useRef, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import AgencyProfile from "./AgencyProfile";
import AdvisorRecruiterProfile from "./AdvisorRecruiterProfile";

const Profile = () => {
  const {
    state: { user, },
  } = useContext(AuthContext);

  return (
    <>
    {user?.role == 'agency' && (<AgencyProfile />)}
    {(user?.role == 'advisor' || user?.role == 'recruiter') && (<AdvisorRecruiterProfile />)}
    </>
  )
};

export default Profile;