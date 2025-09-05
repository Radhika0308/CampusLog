import mongoose from "mongoose";

let isConnected = false;

const connectDB = async() => {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("Database already connected");
        return;
    }

    try{
        // Close existing connection if any
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'CampusLog',
            serverSelectionTimeoutMS: 5000, // 5 seconds
            socketTimeoutMS: 30000, // 30 seconds
            connectTimeoutMS: 5000, // 5 seconds
            maxPoolSize: 1, // Single connection for serverless
            minPoolSize: 0,
            maxIdleTimeMS: 10000, // Close connections after 10 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0, // Disable mongoose buffering
        });
        
        isConnected = true;
        console.log("Database connected successfully");
        
    } catch(error){
      console.log("Database connection error:", error.message);
      isConnected = false;
      throw error;
    }
}

export default connectDB;