import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import styles from "../styles/Login.module.css";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const { setIsAuthenticated, setShowSignup, redirectPath, setRedirectPath } = useContext(AuthContext);
  //const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/api/users/login`,
        formData
      );
      const { token } = res.data;
      if (res.status === 200) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        // navigate(redirectPath || "/");
        // setRedirectPath(null); 
        onClose();
        // navigate(from, { replace: true });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.formSection}>
        <h1 className={styles.title}>Welcome back!</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.btn}>
          {isLoading ? (
              <div className={styles.spinner}></div>
            ) : "Login"}
          </button>
        </form>

        <div className={styles.or}></div>

        <p className={styles.footerText}>
          Not a user?{" "}
          <span
            style={{ color: "#fbbf24", cursor: "pointer", fontWeight: "600" }}
            onClick={() => {
              onClose();
              setShowSignup(true);
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </Modal>
  );
}
