import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Creatives from "./pages/Creatives";
import Agencies from "./pages/Agencies";
import SpotlightCreatives from "./pages/SpotlightCreatives";
import MentorResources from "./pages/MentorResources";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";

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
    ],
  },
]);
