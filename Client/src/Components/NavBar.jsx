
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = ({
  setIsAuthenticated,
  isAuthenticated
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      navigate("/login");
      // Toast message handled in Login/Register
    } catch (error) {
      // Toast message handled in Login/Register
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Span Tech</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isAuthenticated ? (
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          ) : (
            <>
              <li onClick={() => navigate("/login")}>
                <a>Login</a>
              </li>
              <li onClick={() => navigate("/register")}>
                <a>Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
