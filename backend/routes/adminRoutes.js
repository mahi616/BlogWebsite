import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

/**
 * ⚠️ TEMPORARY ROUTE (use once only)
 * POST /api/admin/create
 */
router.post("/create", async (req, res) => {
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
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin create error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
// module.exports = router;
