import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    // Check if we have a connection already
    if (connection.isConnected) {
        console.log("Using existing database connection");
        return; // Just return, don't throw an error!
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        
        connection.isConnected = db.connections[0].readyState;

        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed:", error);
    }
}

export default dbConnect;