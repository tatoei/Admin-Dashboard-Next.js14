import mongoose from "mongoose";

interface ConnectionStatus {
  isConnected?: number;
}

export const connectToDb = async () => {
  const connection: ConnectionStatus = {};
  try {
    if (mongoose.connection.readyState !== 0) return;
    await mongoose.connect(process.env.MONGO!);
    connection.isConnected = mongoose.connection.readyState;
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).toString());
  }
};