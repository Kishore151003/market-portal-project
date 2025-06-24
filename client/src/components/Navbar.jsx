import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand mb-0 h1">Market Portal</span>
      <div>
        <Link to="/dashboard" className="btn btn-outline-light me-2">Dashboard</Link>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
