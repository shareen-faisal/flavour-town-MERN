import React from "react";
import styles from "../styles/FeaturesSection.module.css";
import { FaHamburger, FaLeaf, FaTruck, FaUtensils } from "react-icons/fa";

const features = [
  {
    icon: <FaUtensils />,
    title: "Super Quality Food",
    description: "Delicious meals crafted with premium ingredients, ensuring top-notch taste in every bite.",
  },
  {
    icon: <FaHamburger />,
    title: "Original Recipes",
    description: "Unique recipes created by our chefs to bring you flavors you won’t find anywhere else.",
  },
  {
    icon: <FaTruck />,
    title: "Quick Fast Delivery",
    description: "Hot and fresh food delivered to your doorstep in no time.",
  },
  {
    icon: <FaLeaf />,
    title: "100% Fresh Foods",
    description: "We use only the freshest vegetables, meats, and spices in all our dishes.",
  },
];

const FeaturesSection = () => {
  return (
    <div className={styles.featuresSection}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div className={styles.icon}>{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
