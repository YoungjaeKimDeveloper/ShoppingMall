import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.info("MONGODB_CONNECTED");
  } catch (error) {
    console.error("ERROR IN CONNECTING MONGODB: ", error.message);
    process.exit(1);
  }
};
