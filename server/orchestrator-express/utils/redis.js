import Redis from 'ioredis';

export const redis = new Redis();

export const setTime = async (chache) => {
  await redis.expire(chache, 1200);
};
