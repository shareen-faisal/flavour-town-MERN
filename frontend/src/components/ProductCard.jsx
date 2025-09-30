// ProductCard.jsx
import React, { useState } from "react";
import styles from "../styles/ProductCard.module.css";
import ProductModal from "./ProductModal.jsx";

const ProductCard = ({ product }) => { // No need for 'isAvailable' prop here
  const [open, setOpen] = useState(false);

  // Check availability directly from the product prop
  const isAvailable = product.isAvailable; 

  const handleCardClick = () => {
    if (isAvailable) {
      setOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`${styles.card} ${!isAvailable ? styles.unavailable : ''}`} 
        onClick={handleCardClick}
      >
        <img src={product.image} alt={product.name} className={styles.image} />

        {/* <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>PKR {product.price}</p>
          {isAvailable ? (
            <button
              className={styles.addToCartBtn}
              onClick={handleCardClick}
            >
              Add to Cart
            </button>
          ) : (
            <span className={styles.unavailableText}>Out of Stock</span>
          )}
        </div> */}
        <div className={styles.info}>
  <h3 className={styles.name}>{product.name}</h3>

  {isAvailable ? (
    <div className={styles.priceRow}>
      <p className={styles.price}>PKR {product.price}</p>
      <button
        className={styles.addToCartBtn}
        onClick={handleCardClick}
      >
        Add to Cart
      </button>
    </div>
  ) : (
    <span className={styles.unavailableText}>Unavailable</span>
  )}
</div>


      </div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ProductCard;