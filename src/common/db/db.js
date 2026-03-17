import mongoose from "mongoose";

let cached = global.__db || { conn: null, promise: null };
global.__db = cached;

export async function connectDB(uri = process.env.DB_CONNECTION) {
  if (!uri) throw new Error("DB_CONNECTION not set");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("bufferCommands", false);

    mongoose.connection.on("connected", () => console.log("[mongo] connected"));
    mongoose.connection.on("disconnected", () =>
      console.warn("[mongo] disconnected"),
    );
    mongoose.connection.on("error", (e) => console.error("[mongo] error", e));

    cached.promise = mongoose
      .connect(uri, {
        maxPoolSize: 5,
        minPoolSize: 0,
        serverSelectionTimeoutMS: 20000, // 20s
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
