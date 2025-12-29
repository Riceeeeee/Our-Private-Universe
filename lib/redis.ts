import { createClient } from 'redis';

let redis: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL,
    });

    redis.on('error', (err) => console.log('Redis Client Error', err));
    
    await redis.connect();
  }

  return redis;
};

export const disconnectRedis = async () => {
  if (redis) {
    await redis.quit();
    redis = null;
  }
};
