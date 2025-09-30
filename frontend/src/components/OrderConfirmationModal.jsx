import React from "react";
import styles from "../styles/OrderConfirmationModal.module.css";

const OrderConfirmationModal = ({ order, onClose }) => {
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const orderTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Thank you for your purchase! 🎉</h2>
          <p>Your order is confirmed and will be delivered soon.</p>
        </div>

        <div className={styles.mainContent}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={`${styles.infoBlock} ${styles.orderDetails}`}>
              <h3>Order Details</h3>
              <p>
                <strong>Order Number:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong> {orderDate}
              </p>
              <p>
                <strong>Time:</strong> {orderTime}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </div>
            <div className={`${styles.infoBlock} ${styles.billingDetails}`}>
              <h3>Billing Address</h3>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Address:</strong> {order.address}, {order.area},{" "}
                {order.city}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.summaryBox}>
              <h3>Order Summary</h3>
              <ul className={styles.itemList}>
                {order.items.map((item) => (
                  // ... inside the {order.items.map((item) => ( ... ))}
                  <li key={item.itemId} className={styles.item}>
                    {/* First Row: Quantity x Name - Base Price */}
                    <div className={styles.itemRow}>
                      <span className={styles.itemName}>
                        {item.quantity} × {item.name}
                      </span>
                      <span className={styles.itemPrice}>
                        Rs. {item.basePrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Second Row: Addons List */}
                    {item.addons && item.addons.length > 0 && (
                      <ul className={styles.addonsList}>
                        {item.addons.map((addon) => (
                          <li key={addon.addonId} className={styles.addonItem}>
                            {addon.name} – Rs. {addon.price.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Third Row: Item Total */}
                    <div className={styles.itemTotalRow}>
                      <strong>Item Total:</strong>
                      <span>Rs. {item.finalPrice.toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.totalsSection}>
                <p>
                  <strong>Total:</strong> Rs.{" "}
                  {order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
