import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Creatives from "./pages/Creatives";
import CreativeSearch from "./pages/CreativeSearch";
import AgencySearch from "./pages/AgencySearch";
import Agencies from "./pages/Agencies";
import AgencieRoles from "./pages/AgencieRoles";
import SpotlightCreatives from "./pages/SpotlightCreatives";
import MentorResources from "./pages/MentorResources";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import GroupPosts from "./pages/GroupPosts";
import Jobs from "./pages/Jobs/Jobs";
import CommunityMembers from "./pages/CommunityMembers";
import GroupMembers from "./pages/GroupMembers";
import Friends from "./pages/User/Friends";
import Groups from "./pages/Groups";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Activities from "./pages/Activities";
import About from "./pages/About";
import ViewPage from "./pages/User/ViewPage";
import JobDescription from "./pages/Jobs/JobDescription";
import UserDashboard from "./pages/User/UserDashboard";
import Checkout from "./pages/Cart/Checkout";
import CopyWriting from "./pages/Mentor/CopyWriting";
import LoginAs from "./pages/LoginAs";
import ForgotPassword from "./pages/ForgotPassword";
import { useContext, useEffect } from "react";
import { Context as AuthContext } from "./context/AuthContext";
import Logout from "./pages/Logout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Inspire from "./pages/Mentor/Inspire";
import Art from "./pages/Mentor/Art";
import Portfolio from "./pages/Mentor/Portfolio";
import Business from "./pages/Mentor/Business";
import Tech from "./pages/Mentor/Tech";
import ResetPassword from "./pages/ResetPassword";
import FilmFestival1 from "./pages/FilmFestival1";
import GroupRequests from "./pages/GroupRequests";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/creatives",
        element: <Creatives />,
      },

      {
        path: "/creatives/search/:field/:search",
        element: <CreativeSearch />,
      },

      {
        path: "/creatives/location/:field/:search",
        element: <CreativeSearch />,
      },

      {
        path: "/agencies/location/:field/:search",
        element: <AgencySearch />,

      },

      {
        path: "/community",
        element: <Community />,
      },

      {
        path: "/groups/:group_uuid",
        element: <GroupPosts />,
      },

      {
        path: "/agencies",
        element: <Agencies />,
      },

      {
        path: "/agencies/:role",
        element: <AgencieRoles />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/spotlighting-creatives",
        element: <SpotlightCreatives />,
      },
      {
        path: "/mentoring-resources",
        element: <MentorResources />,
      },
      {
        path: "/mentoring-resources/:slug",
        element: <MentorResources />,
      },
      {
        path: "/publication-resources",
        element: <Publications />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/creative-jobs",
        element: <Jobs />,
      },

      {
        path: "/job-category/:category_slug",
        element: <Jobs />,
      },

      {
        path: "/job-location-state/:state_slug",
        element: <Jobs />,
      },

      {
        path: "/job-location-city/:city_slug",
        element: <Jobs />,
      },

      {
        path: "/job-type/:employment_type",
        element: <Jobs />,
      },

      {
        path: "/creative-jobs/search/:search",
        element: <Jobs />,
      },

      {
        path: "/community-members",
        element: <CommunityMembers />,
      },

      {
        path: "/group-members/:group_uuid",
        element: <GroupMembers />,
      },

      {
        path: "/group-requests/:group_uuid",
        element: <GroupRequests />,
      },

      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/messages/:any",
        element: <Messages />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/:type/:username/:role_name",
        element: <ViewPage />,
      },
      {
        path: "/:type/:username",
        element: <ViewPage />,
      },
      {
        path: "/groups/create",
        element: <h1 className="mt-5">Coming soon</h1>,
      },
      {
        path: "/job/:job",
        element: <JobDescription />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "/copywriting-mentors",
        element: <CopyWriting />,
      },
      {
        path: "/inspire-mentors",
        element: <Inspire />,
      },
      {
        path: "/art-mentors",
        element: <Art />,
      },
      {
        path: "/portfolio-mentors",
        element: <Portfolio />,
      },
      {
        path: "/business-mentors",
        element: <Business />,
      },
      {
        path: "/tech-mentors",
        element: <Tech />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "/:page",
        element: <UserDashboard />,
      },
      {
        path: "/job/edit/:id",
        element: <UserDashboard />,
      },
      {
        path: "/loginas/:token",
        element: <LoginAs />,
      }
    ],
  },
]);
