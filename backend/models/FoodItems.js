const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, trim: true,},
    description: { type: String, required: true,},
    price: {type: Number,required: true,min: 0,},
    category: {type: String,required: true, enum: ["Burgers", "Wraps", "Drinks", "Desserts", "Sides"], },
    image: {type: String, required: true,},
    isAvailable: {type: Boolean,default: true,},
  },
  { timestamps: true }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem
