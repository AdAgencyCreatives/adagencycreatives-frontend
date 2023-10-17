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
import Jobs from "./pages/Jobs";
import CommunityMembers from "./pages/CommunityMembers";
import Friends from "./pages/User/Friends";
import Groups from "./pages/Groups";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Profile from "./pages/User/Profile";
import JobDescription from "./pages/JobDescription";
import Agency from "./pages/User/Agency";
import Checkout from "./pages/Cart/Checkout";
import CopyWriting from "./pages/Mentor/CopyWriting";
import LoginAs from "./pages/LoginAs";

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
        path: "/:username/friends",
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
        path: "/logout",
        element: <CopyWriting />,
      },

      {
        path: "/:page",
        element: <Agency />,
      },
      {
        path: "/loginas",
        element: <LoginAs />,
      },
    ],
  },
]);
