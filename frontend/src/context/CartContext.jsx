// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(()=>{
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((item) => item._id === product._id);

//       if (existing) {
//         return prevCart.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === productId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedAddons = []) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) =>
          item._id === product._id &&
          JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
      );

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id &&
          JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, addons: selectedAddons }];
      }
    });
  };

  const removeFromCart = (productId, selectedAddons = []) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item._id === productId &&
            JSON.stringify(item.addons || []) === JSON.stringify(selectedAddons || [])
          )
      )
    );
  };
  

  const updateQuantity = (productId, newQuantity, selectedAddons = []) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedAddons);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId &&
        JSON.stringify(item.addons) === JSON.stringify(selectedAddons)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice =Math.floor( cart.reduce((sum, item) => {
    const addonsTotal = item?.addons?.reduce(
      (addonSum, addon) => addonSum + addon.price,
      0
    ) || 0;
    return sum + (item.price + addonsTotal) * item.quantity;
  }, 0) );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

