import mongoose from "mongoose";


const connectDB = async() => {
    try{
        mongoose.connection.on('connected',()=> console.log("Database connected"))
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'CampusLog',
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        })
    } catch(error){
      console.log("Database connection error:", error.message);
    }
}


export default connectDB;