import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token from localStorage
    navigate("/"); // redirect to login
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h1">Market Portal</span>
      <div>
        <Link to="/dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
