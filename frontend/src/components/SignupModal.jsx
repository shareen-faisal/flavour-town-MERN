import { useState , useContext} from "react";
import axios from "axios";
import Modal from "./Modal";
import styles from "../styles/Login.module.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Lahore", areas: ["DHA", "Gulberg", "Model Town"] },
  { name: "Karachi", areas: ["Clifton", "Gulshan-e-Iqbal", "Defence"] },
  { name: "Islamabad", areas: ["F-10", "E-11", "G-6"] },
];

export default function SignupModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    area: "",
  });
  const { setIsAuthenticated, setShowLogin, setShowSignup, redirectPath, setRedirectPath } = useContext(AuthContext);
  // const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "city") {
      setFormData({
        ...formData,
        city: value,
        area: "", 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password.length<5){
      alert('Password should be atleast 5 digits.')
      return;
    }
    setIsLoading(true)
    try {
      const res = await axios.post(`/api/users/signup`, formData);
      if (res.status === 200) {
        setIsAuthenticated(true);
        const { token } = res.data;
        localStorage.setItem("token", token);
        // navigate(redirectPath || "/");
        // setRedirectPath(null); 
        onClose();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.formSection}>
        <h1 className={styles.title}>Get Started Now!</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" type='text'  value={formData.name} onChange={handleChange} required />

          <label>Email address</label>
          <input name="email" type='email'  value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>City</label>
              <select name="city" value={formData.city} onChange={handleChange} required >
                <option value="">Select City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Area</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                disabled={!formData.city}
                required
              >
                <option value="">Select Area</option>
                {cities.find((c) => c.name === formData.city)?.areas.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button type="submit" className={styles.btn}>
          {isLoading ? (
              <div className={styles.spinner}></div>
            ) : "Signup"}
          </button>
        </form>

        <div className={styles.or}></div>

        <p className={styles.footerText}>
          Already have an account?{" "}
          <span
            style={{ color: "#fbbf24", cursor: "pointer", fontWeight: "600" }}
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          >
            Login
          </span>
        </p>

      </div>
    </Modal>
  );
}
