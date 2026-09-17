import { createClient } from 'redis';
import { ENV } from './env';


const globalForRedis = global as unknown as { redisClient: ReturnType<typeof createClient> }


export const redisClient = globalForRedis.redisClient || createClient({
    url: ENV.REDIS_URL,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000)
    }
});

if (ENV.NODE_ENV !=='production')
    globalForRedis.redisClient = redisClient;

export const getRedisConnection = async () => {
    if (!redisClient.isOpen)
        await redisClient.connect();
    return redisClient;
};