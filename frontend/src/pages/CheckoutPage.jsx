import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext.jsx";
import styles from "../styles/CheckoutPage.module.css";
import axios from "axios";
import OrderConfirmationModal from "../components/OrderConfirmationModal.jsx";
import { useNavigate } from "react-router-dom";

const cities = [
  { name: "Lahore", areas: ["DHA", "Gulberg", "Model Town"] },
  { name: "Karachi", areas: ["Clifton", "Gulshan-e-Iqbal", "Defence"] },
  { name: "Islamabad", areas: ["F-10", "E-11", "G-6"] },
];

const CheckoutPage = () => {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // const subtotal =Math.floor( cart.reduce((sum, item) => {
  //   const addonsTotal =
  //     item.addons?.reduce((aSum, addon) => aSum + addon.price, 0) || 0;
  //   const itemTotal = (item.price + addonsTotal) * item.quantity;
  //   return sum + itemTotal;
  // }, 0));

  const subtotal = totalPrice

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
  });

  const deliveryCharges = 60;
  const taxRate = 0.16;
  const grandTotal = Math.floor(subtotal + deliveryCharges + subtotal * taxRate);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(
        `/api/users/info`,
        {
          headers: {
            Authorization: `Brearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { name, email, city, area } = res.data.user;
      setFormData((pre) => ({
        ...pre,
        name: name || "",
        email: email || "",
        city: city || "",
        area: area || "",
      }));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value, area: "" });
  };

  const handleAreaChange = (e) => {
    setFormData({ ...formData, area: e.target.value });
  };

  const currentAreas = formData.city ? cities.find((city) => city.name === formData.city)?.areas || []
    : [];

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      alert("Phone number must be exactly 11 digits.");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.area
    ) {
      alert("Please fill out all contact and address fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }

    setIsPlacingOrder(true);

    const orderItems = cart.map((item) => {
      const addonTotal = item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
      const finalPrice = Math.floor( (item.price + addonTotal) * item.quantity );
    
      return {
        itemId: item._id,
        name: item.name,
        basePrice: item.price,   
        finalPrice,              
        quantity: item.quantity,
        addons:
          item.addons?.map((addon) => ({
            addonId: addon._id,
            name: addon.name,
            price: addon.price,
          })) || [],
      };
    });
    

    const orderPayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      area: formData.area,
      totalAmount: grandTotal,
      items: orderItems,
    };

    try {
      const response = await axios.post(`/api/order/`, orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data);
      setIsModalOpen(true);
      clearCart();
    } catch (error) {
      console.error("There was an error placing the order:", error);
      alert("Failed to place the order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrder(null);
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className={styles.input}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Address</h2>
          <div className={styles.dropdownGroup}>
            <select
              className={styles.dropdown}
              value={formData.city}
              onChange={handleCityChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              className={styles.dropdown}
              value={formData.area}
              onChange={handleAreaChange}
              disabled={!formData.city}
              required
            >
              <option value="">Select Area</option>
              {currentAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Street, House No., etc."
            className={styles.fullWidthInput}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Select Payment Method</h2>
          <div className={styles.paymentMethod}>
            <div className={`${styles.paymentCard} ${styles.activePayment}`}>
              <span>Cash On Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Your Cart Summary */}
      <div className={styles.rightPanel}>
        <div className={styles.cartContainer}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name} - PKR {Math.floor(item.price)}</h3>

                    {item.addons && item.addons.length > 0 && (
                      <ul className={styles.addonsList}>
                        {item.addons.map((addon) => (
                          <li key={addon._id} className={styles.addonItem}>
                            {addon.name} — Rs. {addon.price.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className={styles.itemMeta}>
                      <span className={styles.itemQuantity}>
                        {item.quantity}x
                      </span>
                      <span className={styles.itemPrice}>
                        Item Total: PKR{" "}
                        {Math.floor(
                          (item.price +
                            (item.addons?.reduce((a, ad) => a + ad.price, 0) ||
                              0)) *
                          item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.cartTotals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Delivery Charges</span>
              <span>Rs. {deliveryCharges.toLocaleString()}</span>
            </div>
            <div className={styles.totalRowBold}>
              <span>Grand total (Incl. 16% TAX)</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
            <button
              className={styles.placeOrderBtn}
              onClick={placeOrder}
              disabled={cart.length === 0 || isPlacingOrder}
            >
              {isPlacingOrder ? (
                <div className={styles.spinner}></div>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <OrderConfirmationModal order={order} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CheckoutPage;
