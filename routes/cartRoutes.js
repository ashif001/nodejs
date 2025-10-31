import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// 🟢 Add to Cart
router.post("/add", async (req, res) => {
  try {
    const { user_id, session_id, product_id, quantity } = req.body;

    const newItem = new Cart({
      user_id,
      session_id,
      product_id,
      quantity,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added to cart", data: newItem });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

// 🟣 Get Cart Items by session_id or user_id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cartItems = await Cart.find({
      $or: [{ session_id: id }, { user_id: id }],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

// 🔴 Remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
});

export default router;
