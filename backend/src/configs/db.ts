import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (): Promise<void> => {
  try {
    const dbConnString = process.env.DB_CONN_STRING;

    if (!dbConnString) {
      throw new Error("DB_CONN_STRING is not defined");
    }

    await mongoose.connect(dbConnString);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;