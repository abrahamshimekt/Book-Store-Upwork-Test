const redis = require("redis");
// redis cache client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis error", err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
