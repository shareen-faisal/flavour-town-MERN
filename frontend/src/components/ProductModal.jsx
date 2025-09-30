import { useState, useContext, useEffect } from "react";
import styles from "../styles/ProductModal.module.css";
import { CartContext } from "../context/CartContext.jsx";
import axios from "axios";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState({}); 

  if (!product) return null;

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/addon/${product.category}`
        );
        setAddons(res.data);
      } catch (err) {
        console.error("Failed to fetch addons", err);
      }
    };
    fetchAddons();
  }, [product.category]);

  const groupedAddons = addons.reduce((acc, addon) => {
    if (!acc[addon.type]){ 
      acc[addon.type] = []
    }
    acc[addon.type].push(addon);
    return acc;
  }, {});

  const selectedAddonsTotal = Object.values(selectedAddons).reduce((sum, addonId) => {
    const addon = addons.find((a) => a._id === addonId);
    return sum + (addon ? addon.price : 0);
}, 0);

  const handleAddonChange = (type, addonId) => {
    setSelectedAddons({
      ...selectedAddons,
      [type]: addonId, 
    });
  };

const handleAdd = () => {
  const selectedAddonIds = Object.values(selectedAddons);

  const addonObjects = addons.filter(addon => 
      selectedAddonIds.includes(addon._id)
  );

  addToCart(product, quantity, addonObjects);
  onClose();
  alert("Item added to Cart!");
};

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.content}>
          <div className={styles.left}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>

          <div className={styles.right}>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>

            {Object.keys(groupedAddons).map((type) => (
              <div key={type} className={styles.addonGroup}>
                <label>{type.toUpperCase()}</label>
                <select
                  value={selectedAddons[type] || ""}
                  onChange={(e) => handleAddonChange(type, e.target.value)}
                >
                  <option value="">-- Select {type} --</option>
                  {groupedAddons[type].map((addon) => (
                    <option key={addon._id} value={addon._id}>
                      {addon.name} (+PKR {addon.price})
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.quantityControl}>
            <button onClick={handleDecrease} className={styles.qtyBtn}>
              -
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button onClick={handleIncrease} className={styles.qtyBtn}>
              +
            </button>
          </div>
          <button className={styles.addToCartBtn} onClick={handleAdd}>
          Add to Cart — PKR {((product.price + selectedAddonsTotal) * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
