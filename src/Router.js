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
    ],
  },
]);
