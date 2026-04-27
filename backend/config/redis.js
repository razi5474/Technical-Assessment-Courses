import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Error:", err));

const connectRedis = async () => {
  try {
    console.log("REDIS URL:", process.env.REDIS_URL); // debug

    await client.connect();
    console.log("Redis Connected ✅");
  } catch (error) {
    console.log("Redis connection failed ❌", error);
  }
};

export { client, connectRedis };