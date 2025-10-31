// backend/controllers/wishlistController.js

import Wishlist from "../models/Wishlist.js";

// ➕ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { user_id, session_id, product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const filter = user_id ? { user_id, product_id } : { session_id, product_id };
    const existing = await Wishlist.findOne(filter);

    if (existing) {
      return res.status(200).json({ message: "Already in wishlist" });
    }

    const newItem = await Wishlist.create({ user_id, session_id, product_id });
    res.status(201).json({ message: "Item added to wishlist", item: newItem });
  } catch (err) {
    console.error("Wishlist error:", err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// 🧾 Get Wishlist Items
export const getWishlistItems = async (req, res) => {
  try {
    const { user_id, session_id } = req.query;
    const filter = user_id ? { user_id } : { session_id };
    const items = await Wishlist.find(filter);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to get wishlist items" });
  }
};

// ❌ Remove from Wishlist
export const removeWishlistItem = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
