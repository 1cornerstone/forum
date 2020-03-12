
const redis = require('redis'),
    redisClient = redis.createClient({
        host: 'redis',
        port: 6379});

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = redisClient;