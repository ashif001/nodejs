import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  session_id: { type: String },
  user_id: { type: String },
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Wishlist", wishlistSchema);
