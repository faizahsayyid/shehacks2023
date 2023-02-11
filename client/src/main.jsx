import React from "react";
import ReactDOM from "react-dom/client";
import "bootswatch/dist/lux/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import AllDrafts from "./pages/AllDrafts";
import Playground from "./pages/Playground";
import Learning from "./pages/Learning";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main className="container mt-4">
          <Outlet />
        </main>
      </>
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
