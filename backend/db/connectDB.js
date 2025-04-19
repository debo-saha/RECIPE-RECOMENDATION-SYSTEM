import mongoose from "mongoose";

export const connectDB= async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

