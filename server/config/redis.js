require('dotenv').config();

const redis = require('redis');


const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const PASSWORD = process.env.REDIS_PASSWORD;

const client = redis.createClient({
    socket:{
        host : HOST , 
        port : PORT 
    },
    password : PASSWORD 
});
const init_redis = async() =>{
await client.connect()
}



module.exports = {init_redis , client} ;


