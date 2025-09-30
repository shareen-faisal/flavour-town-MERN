const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authenticateUser = require('../middleware/authMiddleware.js')


router.post('/signup' , async (req,res)=>{
    const {email,name,password,city,area} = req.body
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password,10)
        const newUser = new User({email,password:hash,name,city,area})
        await newUser.save()

        const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET, {expiresIn : '7d'})
        return res.status(200).json({message:'User created successfully!',token})
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/login' , async (req,res)=>{
    const {email,password} = req.body

    try{
        const exists = await User.findOne({email})
        if(!exists){
            return res.status(401).json({message:'Invalid Credentials'})
        }

        const comparePassword = await bcrypt.compare(password,exists.password)
        if(!comparePassword){
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({id:exists._id} , process.env.JWT_SECRET , {expiresIn:'7d'})
        res.status(200).json({message:'User logged in!', token });
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/verify-token', async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) return res.status(401).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'Token valid', token: decoded.id });
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  });

router.get('/info' , authenticateUser, async (req,res)=>{
    const id = req.userId

    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({message: 'Not user found!'})
        }

        return res.status(200).json({user})
    }catch(error){
        res.status(500).json({message: 'Internal Server error!'})
    }
})  

module.exports = router