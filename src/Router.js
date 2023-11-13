import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Creatives from "./pages/Creatives";
import Agencies from "./pages/Agencies";
import SpotlightCreatives from "./pages/SpotlightCreatives";
import MentorResources from "./pages/MentorResources";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Jobs from "./pages/Jobs/Jobs";
import CommunityMembers from "./pages/CommunityMembers";
import Friends from "./pages/User/Friends";
import Groups from "./pages/Groups";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Activities from "./pages/Activities";
import About from "./pages/About";
import Profile from "./pages/User/Profile";
import JobDescription from "./pages/Jobs/JobDescription";
import UserDashboard from "./pages/User/UserDashboard";
import Checkout from "./pages/Cart/Checkout";
import CopyWriting from "./pages/Mentor/CopyWriting";
import LoginAs from "./pages/LoginAs";
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
        path: "/community",
        element: <Community />,
      },

      {
        path: "/agencies",
        element: <Agencies />,
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
        path: "/community-members",
        element: <CommunityMembers />,
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
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/agency/:username",
        element: <Profile />,
      },
      {
        path: "/creative/:username",
        element: <Profile />,
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
        path: "/logout",
        element: <Logout />,
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
        path: "/loginas",
        element: <LoginAs />,
      },
    ],
  },
]);
