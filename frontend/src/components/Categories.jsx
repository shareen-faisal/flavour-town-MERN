import React from "react";
import { Link } from "react-router-dom"; // ✅ added for navigation
import styles from "../styles/Categories.module.css";

import burgersImg from "../assets/burgers.png";
import wrapsImg from "../assets/wraps.png";
import sidesImg from "../assets/sides.png";
import drinksImg from "../assets/drinks.png";
import dessertsImg from "../assets/cookies.png";

const categories = [
  { name: "Burgers", image: burgersImg, path: "/category/burgers" },
  { name: "Wraps", image: wrapsImg, path: "/category/wraps" },
  { name: "Sides", image: sidesImg, path: "/category/sides" },
  { name: "Drinks", image: drinksImg, path: "/category/drinks" },
  { name: "Desserts", image: dessertsImg, path: "/category/desserts" },
];

const Categories = () => {
  return (
    <section className={styles.container} id='menu' >
      <p className={styles.subtitle}>Crispy, Every Bite Taste</p>
      <h2 className={styles.title}>Food Categories</h2>

      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <Link key={index} to={cat.path} className={styles.card}>
            <img src={cat.image} alt={cat.name} className={styles.image} />
            <h3 className={styles.name}>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
