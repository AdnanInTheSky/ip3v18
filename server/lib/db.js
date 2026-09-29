import mongoose from 'mongoose';

/**
 * Serverless-safe MongoDB connection.
 * Sets bufferCommands to false to fail-fast and avoid hanging when MongoDB is offline.
 */

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'ip3';

mongoose.set('bufferCommands', false); // CRITICAL: fail fast, don't hang

let cached = globalThis.__ip3Mongoose;
if (!cached) {
  cached = globalThis.__ip3Mongoose = { conn: null, promise: null };
}

export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) return cached.conn;

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((m) => m.connection)
      .catch((err) => {
        console.warn('MongoDB not connected — fallback active:', err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export function dbState() {
  return ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'disconnected';
}

export async function dbPing() {
  try {
    if (mongoose.connection.readyState !== 1) return 'offline';
    await mongoose.connection.db.admin().ping();
    return 'ok';
  } catch {
    return 'failed';
  }
}

export default connectDB;
