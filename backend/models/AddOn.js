const mongoose = require("mongoose");

const addonSchema = new mongoose.Schema({
  name: {type: String , required: true},
  price: {type: Number , required: true},
  type: { 
    type: String, 
    enum: ["drink", "fries", "extra"] 
  }, 
  appliesToCategories: [String] 
});

module.exports = mongoose.model("Addon", addonSchema);
