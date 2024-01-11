import { useContext, useEffect, useRef, useState } from "react";
import { Context as AuthContext } from "../../../context/AuthContext";
import AgencyProfile from "./AgencyProfile";
import AdvisorRecruiterProfile from "./AdvisorRecruiterProfile";

const Profile = () => {

  const [render, setRender] = useState(<></>);

  const {
    state: { user, },
    reloadUserData,
  } = useContext(AuthContext);

  useEffect(() => {

    if (user) {
      if (user.role == 'agency') {
        setRender(<AgencyProfile />);
      } else if (user.role == 'advisor' || user.role == 'recruiter') {
        setRender(<AdvisorRecruiterProfile />);
      }
    }
  }, [user]);

  return (
    <>{render}</>
  )
};

export default Profile;
