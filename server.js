// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is running and MongoDB is connected!" });
});

app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Example API to insert test data (optional)
app.post("/api/add", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const TestModel = mongoose.model(
      "Whitelist",
      new mongoose.Schema({ name: String })
    );

    const newEntry = new TestModel({ name });
    await newEntry.save();

    res.json({ message: "✅ Data added successfully", data: newEntry });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
