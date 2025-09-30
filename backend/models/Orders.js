const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },

    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Out for Delivery', 'Completed'],
      default: 'Pending',
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'FoodItem',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        basePrice: {   
          type: Number,
          required: true,
        },
        finalPrice: {  
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        addons: [
          {
            addonId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Addon',
            },
            name: String,
            price: Number,
          },
        ],
      },
    ],
    
  },
  {
    timestamps: true, 
  }
);

module.exports =  mongoose.model('Order', orderSchema);