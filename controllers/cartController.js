import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

// ➕ Add Item to Cart & Wishlist
export const addToCart = async (req, res) => {
  try {
    const { user_id, session_id, product_id, quantity } = req.body;
    if (!product_id) return res.status(400).json({ message: "Product ID required" });

    const filter = user_id ? { user_id, product_id } : { session_id, product_id };
    let existingItem = await Cart.findOne(filter);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
    } else {
      existingItem = await Cart.create({ user_id, session_id, product_id, quantity });
    }

    // 🔄 Also add item to Wishlist automatically
    const wishlistFilter = user_id ? { user_id, product_id } : { session_id, product_id };
    const wishlistExists = await Wishlist.findOne(wishlistFilter);
    if (!wishlistExists) {
      await Wishlist.create({ user_id, session_id, product_id });
    }

    res.status(200).json({
      message: "Item added to cart and wishlist",
      item: existingItem,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// 🛒 Get All Cart Items
export const getCartItems = async (req, res) => {
  try {
    const { user_id, session_id } = req.query;
    const filter = user_id ? { user_id } : { session_id };
    const items = await Cart.find(filter);
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart items" });
  }
};

// ❌ Remove Item
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
