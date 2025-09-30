import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { FaTrash } from "react-icons/fa";   
import styles from "../styles/CartModal.module.css";

const CartModal = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice  } = useContext(CartContext);
  const navigate = useNavigate();

  const deliveryCharges = 60;
  const taxRate = 0.16;
  const grandTotal = Math.floor(totalPrice + deliveryCharges + totalPrice * taxRate);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Your Cart</h2>

          <div className={styles.headerActions}>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear cart
            </button>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Your cart is empty</p>
          ) : (
            cart.map((item) => {
              const addonsTotal = item.addons?.reduce((aSum, addon) => aSum + addon.price, 0) || 0;
              const itemTotal =Math.floor( (item.price + addonsTotal) * item.quantity );

              return (
                <div  key={`${item._id}-${item.addons?.map(a => a._id).join('-') || 'noaddons'}-${item.quantity}`} 
                className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />

                  <div className={styles.itemInfo}>
                    <h3>{item.name} - PKR {item.price}</h3>
                    <p className={styles.description}>{item.description}</p>

                    {/* ✅ Show addons if any */}
                    {item.addons && item.addons.length > 0 && (
                      <div className={styles.addons}>
                        <strong>Add Ons:</strong>
                        <ul className={styles.addonList}>
                          {item.addons.map((addon) => (
                            <li key={addon._id}  className={styles.addonItem}>
                              1x {addon.name} — PKR {addon.price.toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p><strong>Item Total:</strong> PKR {itemTotal.toLocaleString()}</p>
                    
                    <div className={styles.controls}>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1 , item.addons)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1 , item.addons)}>+</button>
                      </div>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => removeFromCart(item._id , item.addons )}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Delivery Charges</span>
              <span>Rs. {deliveryCharges.toLocaleString()}</span>
            </div>
            <div className={styles.totalRowBold}>
              <span>Grand total (Incl. 16% TAX)</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
