import React from "react";
import styles from "../styles/AboutUs.module.css";
import burgerImg from "../assets/aboutUs.png"; 

import { FaUtensils, FaStar } from "react-icons/fa";
import FeaturesSection from "./FeaturesSection";

const AboutUs = () => {
  return (
    <>
    <section className={styles.container} id='about' >

      <div className={styles.imageWrapper}>
        <img src={burgerImg} alt="Burger" className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.subtitle}>About Our Food</p>
        <h2 className={styles.title}>
          Where Quality Meet Excellent <span>Service.</span>
        </h2>
        <p className={styles.description}>
          Its the perfect dining experience where every dish is crafted with
          fresh, high-quality Experience quick and efficient service that ensures
          your food is served fresh. Its the dining experience where every dish is
          crafted with fresh, high-quality ingredients.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <FaUtensils className={styles.icon} />
            <div>
              <h3>Super Quality Food</h3>
              <p>
                A team of dreamers and doers building unique interactive music
                and art
              </p>
            </div>
          </div>

          <div className={styles.feature}>
            <FaStar className={styles.icon} />
            <div>
              <h3>Well Reputation</h3>
              <p>
                A team of dreamers and doers building unique interactive music
                and art
              </p>
            </div>
          </div>
        </div>

        <p className={styles.signature}>
          <span className={styles.name}>Flavour Town</span>
          <br />
          CUSTOMER’S EXPERIENCE IS OUR HIGHEST PRIORITY.
        </p>
      </div>
    </section>
    <FeaturesSection/>
    </>
  );
};

export default AboutUs;
