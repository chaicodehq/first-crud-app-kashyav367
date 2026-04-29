import "dotenv/config"
import mongoose from "mongoose";

/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export const connectDB = async (uri) => {
  if (!uri || uri.trim() === "") {
    throw new Error("MongoDB URI is required");
  }

  const conn = await mongoose.connect(uri);
  return conn.connection;
};