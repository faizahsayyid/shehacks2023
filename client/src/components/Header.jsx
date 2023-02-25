import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearTokensCache } from "../utils/authUtils";

function Header() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showLogoutBtn = useMemo(() => {
    return pathname !== '/login' && pathname !== '/register'
  }, [pathname])

  const logout = () => {
    clearTokensCache();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid mx-4">
        <Link className="navbar-brand" to="/">
          sem:antics
        </Link>
        <button
          className="navbar-toggler"
          onClick={() => setShowHamburgerMenu((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={clsx(
            "collapse navbar-collapse",
            showHamburgerMenu && "show"
          )}
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={clsx("nav-link", pathname === "/" && "active")}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={clsx(
                  "nav-link",
                  pathname === "/playground" && "active"
                )}
                to="/playground"
              >
                Playground
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={clsx("nav-link", pathname === "/drafts" && "active")}
                to="/drafts"
              >
                Past Drafts
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={clsx("nav-link", pathname === "/learn" && "active")}
                to="/learn"
              >
                Learn
              </Link>
            </li> */}
            {showHamburgerMenu && showLogoutBtn && (
              <li className="nav-item">
                <button onClick={logout} className="btn nav-link text-light">
                  Log Out
                </button>
              </li>
            )}
          </ul>

          {!showHamburgerMenu && showLogoutBtn && (
            <button onClick={logout} className="btn nav-link text-light">
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
