import React from "react";
import ReactDOM from "react-dom/client";
import "bootswatch/dist/lux/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";

import Home from "./pages/Home";
import AllDrafts from "./pages/AllDrafts";
import Playground from "./pages/Playground";
import Learning from "./pages/Learning";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/playground",
        element: <Playground />,
      },
      {
        path: "/drafts",
        element: <AllDrafts />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <SignUp />
      }
      // {
      //   path: "/learn",
      //   element: <Learning />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
