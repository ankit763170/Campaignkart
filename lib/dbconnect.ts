import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null } = {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI||"", opts).then((mongoose) => {
      return mongoose;
    }).catch((err) => {
      throw new Error(`Failed to connect to MongoDB: ${err}`);
    });
  }
  cached.conn = await cached.promise;

  if (cached.conn) {
    console.log("Connected to DB");
  } else {
    console.log("Didn't connect");
  }

  return cached.conn;
}

export default dbConnect;
