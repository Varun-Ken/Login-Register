import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import Dashboard from "./Components/Dashboard";
import { ProtectedRoute, AuthRoute } from "./Components/CheckAuth";
import axios from "axios";

import { useEffect, useState } from "react";
import NotFound from "./Components/NotFound";
import Toast from "./Components/Toast";

function App() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status using cookies
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/check-auth",
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    // Check auth status on mount and when auth state changes
    checkUserAuth();
  }, [isAuthenticated]);

  return (
    <>
      <NavBar
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <Routes>
        <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setToast={setToast}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                setIsAuthenticated={setIsAuthenticated}
                setToast={setToast}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setToast={setToast}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/user/dashboard"
            element={
              <Dashboard setIsAuthenticated={setIsAuthenticated} user={user} />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
            <Toast
        open={toast.open}
        setOpen={(open) => setToast(prev => ({ ...prev, open }))}
        message={toast.message}
      />
    </>
  );
}

export default App;
