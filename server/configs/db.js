import mongoose from "mongoose";


let isConnected = false;

const connectDB = async() => {
    if (isConnected) {
        console.log("Database already connected");
        return;
    }

    try{
        mongoose.connection.on('connected',()=> {
            console.log("Database connected");
            isConnected = true;
        });
        
        mongoose.connection.on('disconnected',()=> {
            console.log("Database disconnected");
            isConnected = false;
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'CampusLog',
            serverSelectionTimeoutMS: 10000, // 10 seconds
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
    } catch(error){
      console.log("Database connection error:", error.message);
    }
}


export default connectDB;