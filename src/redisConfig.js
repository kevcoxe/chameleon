
require('dotenv').config()
const redis = require('redis');
const { promisify } = require('util');


const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});


client.on('error', err => {
    console.log('Error ' + err);
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

module.exports = {
    client,
    setAsync,
    getAsync
}
