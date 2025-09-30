const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserRoutes = require('./routes/UserRoutes.js')
const FoodItemRoutes = require('./routes/FoodItemRoutes.js')
const OrderRoutes = require('./routes/OrderRoutes.js')
const path = require("path");
const AddOnRoutes = require('./routes/AddOnRoutes.js')

const app = express()
app.use(cors({
    origin: "*",
    credentials: true
  }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/dist")));

mongoose.connect(process.env.MONGODB_URL)
.then(()=>(console.log('DB Connected!')))
.catch((error)=>(console.error('Failed to connect.',error)))



app.use('/uploads', express.static(path.join(__dirname , 'uploads')));
app.use('/api/users' , UserRoutes)
app.use('/api/foodItem' , FoodItemRoutes)
app.use('/api/order' , OrderRoutes)
app.use('/api/addon' , AddOnRoutes)

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});



app.listen(process.env.PORT , ()=>{
    console.log(`Server running on ${process.env.PORT}`)
})