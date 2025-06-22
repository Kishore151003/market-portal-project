// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h1">Market Portal</span>
      <div>
        <Link to="/dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
        <Link to="/" className="btn btn-outline-danger">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
