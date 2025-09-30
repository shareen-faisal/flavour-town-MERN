import React from "react";
import styles from "../styles/Footer.module.css"; 
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer} id='contact' >
      <div className={styles.footerContainer}>
    
        <div className={styles.footerLeft}>
          <div className={styles.footerItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>
              <span>Gujranwala, Pakistan</span>
            </p>
          </div>

          <div className={styles.footerItem}>
            <FaPhoneAlt className={styles.icon} />
            <p>+92 323 1112333</p>
          </div>

          <div className={styles.footerItem}>
            <FaEnvelope className={styles.icon} />
            <a href="mailto:support@company.com">support@flavourtown.com</a>
          </div>
        </div>

        <div className={styles.footerRight}>
          <h2>About the company</h2>
          <p>
          Flavour Town is your ultimate fast-food destination, serving up mouthwatering burgers, wraps, sides, and desserts made with the freshest ingredients. Our mission is to bring bold flavors and a memorable dining experience to every bite, combining great taste with quick and friendly service.
          </p>
          <div className={styles.footerSocials}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © 2025 Flavor Town. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
