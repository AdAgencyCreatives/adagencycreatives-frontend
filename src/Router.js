import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Creatives from "./pages/Creatives";
import Agencies from "./pages/Agencies";


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
    ],
  },
]);
