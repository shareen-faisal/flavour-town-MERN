import { useState, useContext } from "react";
import styles from "../styles/Navbar.module.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext.jsx";
import CartModal from "./CartModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { isAuthenticated, setIsAuthenticated, setShowLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsOpen(false);
    navigate("/");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="FlovorTown" />
          <span onClick={() => navigate("/")}>Flavour Town</span>
        </div>

        <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <span onClick={() => handleNavClick("/#home")}>Home</span>
            </li>
            <li>
              <span onClick={() => handleNavClick("/#menu")}>Menu</span>
            </li>
            <li>
              <span onClick={() => handleNavClick("/#about")}>About Us</span>
            </li>
            <li>
              <span onClick={() => handleNavClick("/#contact")}>Contact</span>
            </li>
            
            {isAuthenticated && (
              <li>
                <span onClick={() => handleNavClick("/orders")}>
                  Order History
                </span>
              </li>
            )}

            <li className={styles.mobileActions}>
              <div className={styles.cart} onClick={() => setOpenCart(true)}>
                <FaShoppingCart />
                <span className={styles.cartCount}>{totalItems}</span>
              </div>

              {isAuthenticated ? (
                <button className={styles.contactBtn} onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button
                  className={styles.contactBtn}
                  onClick={() => setShowLogin(true)}
                >
                  Login / Signup
                </button>
              )}
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.cart} onClick={() => setOpenCart(true)}>
            <FaShoppingCart />
            <span className={styles.cartCount}>{totalItems}</span>
          </div>

          {isAuthenticated ? (
            <button className={styles.contactBtn} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className={styles.contactBtn}
              onClick={() => setShowLogin(true)}
            >
              Login / Signup
            </button>
          )}
        </div>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {openCart && <CartModal onClose={() => setOpenCart(false)} />}
    </>
  );
}
