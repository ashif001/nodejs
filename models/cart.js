import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: false },
    session_id: { type: String, required: false },
    product_id: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
