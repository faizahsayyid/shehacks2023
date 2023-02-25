import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (!localStorage.getItem("idToken") ||
        !localStorage.getItem("refreshToken")) &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [location]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="container mt-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
