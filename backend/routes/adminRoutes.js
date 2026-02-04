const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

/**
 * ⚠️ Create Admin (TEMP: use once only)
 * POST /api/admin/create
 */
router.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (error) {
    console.error("Admin create error:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Admin Login
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // In production, replace with JWT token
    res.json({ message: "Login successful", admin: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
