const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware.js");
const Order = require("../models/Orders");
const { sendMail } = require("../mailer.js");
const orderEmailTemplate = require('../emails/orderEmailTemplate');

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { name, phone, email, address, city, area, totalAmount, items } =
      req.body;
    const customerId = req.userId;

    const newOrder = new Order({
      customerId,
      name,
      phone,
      email,
      address,
      city,
      area,
      totalAmount,
      items,
    });

    const saved = await newOrder.save();

    const html = orderEmailTemplate(saved);

    try {
        await sendMail(
            saved.email,
            "Your Order Confirmation 🍔 | Order #" + saved._id,
            html
          );
    } catch (mailErr) {
      console.error("❌ Email send failed:", mailErr.message);
    }

    return res.status(201).json(saved);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order. Please try again later." });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const customerId = req.userId;
    const orders = await Order.find({ customerId: customerId }).sort({
      createdAt: -1,
    });

    if (!orders) {
      return res.status(200).json([]);
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res
      .status(500)
      .json({
        message: "Failed to retrieve order history. Please try again later.",
      });
  }
});
module.exports = router;
