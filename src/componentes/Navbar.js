import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider"

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Cierra sesión
    navigate("/"); // Redirige a la ventana principal
  };
  return (
    <div className="bg-dark"><nav className="navbar navbar-expand-lg navbar-dark">
      {/* Dropdown para pantallas pequeñas */}
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links para pantallas grandes y contenido desplegable */}
      <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link me-3" to="/producto">
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/proveedor">
              Supplier
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/catalogo">
              Catalog
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/pedido">
              Order
            </Link>
          </li>
          
          <li className="nav-item">
          <Link className="nav-link me-3" to="/reportesventa">
          Reports Buy/Sell
        </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link ms-3" to="/micart">
              <i
                className="pi pi-cart-plus"
                style={{ color: "green", fontSize: "2rem" }}
              ></i>
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center">
            <h1 className="nav-link text-light"><span style={{ color: "orangered", fontSize: "1.5rem", fontStyle:"italic"}}>Welcome,</span> {user?.displayName.split(" ")[0]}</h1>
            <button
                className="btn btn-outline-light ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
      </div>
    </nav></div>
  );
}

export default Navbar;