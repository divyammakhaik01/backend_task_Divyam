require('dotenv').config();

import * as redis  from 'redis';
import {RedisClientType ,createClient } from '../node_modules/redis/dist/index';


const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT ;
const PASSWORD = process.env.REDIS_PASSWORD;

export const client : RedisClientType  = redis.createClient({
    socket:{
        host : HOST , 
        port : Number(PORT) 
    },
    password : PASSWORD 
});

export const init_redis = async() =>{
await client.connect()
}


export { redis };

