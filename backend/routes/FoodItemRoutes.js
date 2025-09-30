const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware.js')
const FoodItem = require('../models/FoodItems.js')

router.get('/category/:categoryName'  , async (req,res)=>{
    const { categoryName } = req.params;

    try {
      const items = await FoodItem.find({ category: categoryName });
  
      if (!items || items.length === 0) {
        return res.status(404).json({ message: `No items found in ${categoryName}` });
      }
  
      const updatedItems = items.map(item => ({
        ...item._doc,
        image: `${req.protocol}://${req.get("host")}/uploads/${item.image}`
      }));
  
      res.json(updatedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Server error' });
    }
} )

module.exports = router;