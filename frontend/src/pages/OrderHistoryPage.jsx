import React, { useState, useEffect } from "react";
import styles from "../styles/OrderHistoryPage.module.css";
import axios from "axios";

const STATUSES = ["All", "Pending", "Preparing", "Out for Delivery", "Completed"];

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `/api/order`,{
            headers :{
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        // const sortedOrders = res.data.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Failed to load order history.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return styles.statusCompleted;
      case "Out for Delivery":
        return styles.statusDelivery;
      case "Preparing":
        return styles.statusPreparing;
      case "Pending":
      default:
        return styles.statusPending;
    }
  };

  const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.status === filter);

  if (loading) {
    return <div className={styles.container}>Loading order history...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Order History</h1>

      <div className={styles.filterButtons}>
        {STATUSES.map((status) => (
          <button
            key={status}
            className={`${styles.filterBtn} ${
              filter === status ? styles.active : ""
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>


      <div className={styles.ordersList}>
        { filteredOrders.length===0 ? (
          <p className={styles.noOrders}>No {filter} orders found.</p>
        ) : ( filteredOrders.map((order) => (
          <div
            key={order._id}
            className={`${styles.orderCard} ${
              expandedOrderId === order._id ? styles.expanded : ""
            }`}
          >
            <div
              className={styles.summarySection}
              onClick={() => toggleExpand(order._id)}
            >

              {/* <div className={styles.toggleIcon}>
                {expandedOrderId === order._id ? "▲" : "▼"}
              </div> */}
              <div className={styles.summaryRow}>
                {/* First Row */}
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Order ID:</span>
                  <span className={styles.value}>{order._id}</span>
                </div>
                <div className={styles.summaryItem}>
                  <div className={styles.dateTime}>
                    <div className={styles.date}>
                      <span className={styles.label}>Date:</span>
                      <span className={styles.value}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.time}>
                      <span className={styles.label}>Time:</span>
                      <span className={styles.value}>
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.summaryRow}>
           
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Total:</span>
                  <span className={styles.value}>
                    PKR {Math.floor(order.totalAmount)}
                  </span>
                </div>
                <div className={`${styles.summaryItem} ${styles.statusItem}`}>
                  <span className={styles.label}>Status:</span>
                  <span
                    className={`${styles.status} ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            
            {expandedOrderId === order._id && (
              <div className={styles.detailsSection}>
                <h3 className={styles.detailsTitle}>Items Ordered</h3>
                <ul className={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <li key={index} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemName}>
                          {item.quantity} x {item.name}
                        </span>
                        <span className={styles.itemPrice}>
                          PKR {Math.floor(item.basePrice)}
                        </span>
                      </div>
                      {item.addons && item.addons.length > 0 && (
                        <ul className={styles.addonsList}>
                          {item.addons.map((addon, addonIndex) => (
                            <li key={addonIndex} className={styles.addon}>
                              {addon.name} (+PKR{" "}
                              {addon.price.toLocaleString()})
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className={styles.itemTotal}>
                        <strong>Item Total:</strong> PKR{" "}
                        {item.finalPrice.toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )))}

      </div>
    </div>
  );
};

export default OrderHistoryPage;
