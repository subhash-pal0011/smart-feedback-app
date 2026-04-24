import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL;

if (!MONGO_URL) {
       throw new Error("Please define MONGO_URL in .env.local");
}

let cached = global.mongoose;

if (!cached) {
       cached = global.mongoose = {conn: null, promise: null};
}

async function connectDb() {
       try {
              if (cached.conn) {
                     console.log("Already connected to MongoDB");
                     return cached.conn;
              }

              if (!cached.promise) {
                     cached.promise = mongoose.connect(MONGO_URL, {bufferCommands: false});
              }

              cached.conn = await cached.promise;

              console.log("MongoDB Connected Successfully");

              return cached.conn;
       } catch (error) {
              console.error("MongoDB Connection Failed", error);
              throw error;
       }
}

export default connectDb;