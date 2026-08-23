import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Lazily connects on first use rather than at import time, so the rest of
 * the site still builds and runs before MONGODB_URI is configured — only
 * the registration API route needs it.
 */
export default function getMongoClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill in your connection string."
    );
  }

  if (cachedClientPromise) return cachedClientPromise;

  if (process.env.NODE_ENV === "development") {
    // Reuse the connection across hot-reloads in dev.
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    cachedClientPromise = global._mongoClientPromise;
  } else {
    cachedClientPromise = new MongoClient(uri).connect();
  }

  return cachedClientPromise;
}
