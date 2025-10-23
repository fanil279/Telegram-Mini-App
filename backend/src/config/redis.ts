import Redis from 'ioredis';

const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: process.env.NODE_ENV === 'development' ? '' : process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

export default redisClient;
