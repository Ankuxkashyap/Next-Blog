import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to database");
    return;
  }
  try {
    await mongoose.connect("mongodb://localhost:27017/blog-next",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
