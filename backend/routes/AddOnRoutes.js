const express = require('express');
const router = express.Router();
const AddOn = require('../models/AddOn.js')

router.get("/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const addons = await AddOn.find({ appliesToCategories: category.toLowerCase() });
      res.status(200).json(addons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch addons" });
    }
  });

module.exports = router;

  