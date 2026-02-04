const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/create', async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password) return res.status(400).json({message:"All fields required"});
    const adminExists = await Admin.findOne({email});
    if(adminExists) return res.status(400).json({message:"Admin exists"});
    const hashedPassword = await bcrypt.hash(password,10);
    const admin = await Admin.create({name,email,password:hashedPassword});
    res.status(201).json({message:"Admin created", admin:{id:admin._id,email:admin.email}});
});

module.exports = router;
