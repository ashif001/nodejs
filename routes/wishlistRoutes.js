import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// ✅ Add to wishlist
router.post("/add", async (req, res) => {
  try {
    const { session_id, user_id, product_id, name, price, image } = req.body;

    // Check if the item already exists in wishlist
    const existingItem = await Wishlist.findOne({
      $or: [{ user_id }, { session_id }],
      product_id,
    });

    if (existingItem) {
      return res.json({ message: "Item already in wishlist" });
    }

    // Add new wishlist item
    const newItem = new Wishlist({
      session_id,
      user_id,
      product_id,
      name,
      price,
      image,
    });

    await newItem.save();
    res.json({ message: "Item added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
