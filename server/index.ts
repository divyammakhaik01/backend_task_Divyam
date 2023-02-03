require("dotenv").config();

import express from 'express';
import { Application , Request , Response }  from "express";
import  {Server}  from "socket.io";
import db from "./config/db";
import backend_tasks_Divyam from "./model/store";
import { init_redis, client } from "./config/redis";
import path from 'path';

const app : Application = express();

const PORT : any = process.env.PORT || 5500;

app.use(express.static("../client"));

let isRedisAvailable = true;

app.set('views' ,path.join(__dirname , '../client'))
app.set('view engine' , 'ejs')

// Routes

app.get("/", (req : Request, res : Response) => {
  return res.render("index")
  // res.json({
  //   response: "OK",
  // });
});

app.get("/fetchAllTasks", async (req, res) => {
  // query DB

  // res.render("index")

  let result: any;
  let count : any;
  try {
    if (!isRedisAvailable) {
      //
      result = await client.lRange("backend_task_divyam", 0, -1);
      count = await client.lLen("backend_task_divyam");
    } else {
      result = await backend_tasks_Divyam.find();
      count = await backend_tasks_Divyam.count();
    }

    let send : Number [] = []

    for(let i = 0 ; i < result.length ; i++){
      send.push(result[i].text)
    }

    return res.render('notes' ,{
        Count: count,
        List: JSON.stringify(result),
    } )

    // return res.json({
    //   status: "true",
    //   message: {
    //     Count: count,
    //     List: result,
    //   },
    // });
    
  } catch (error) {
    return res.render("index")
    // return res.json({
    //   status: "false",
    //   message: error,
    // });
  }
});

// create server

const server = app.listen(Number(PORT), () => {
  console.log(`server is runnnig at PORT ${PORT} `);
  db();
  init_redis();
});

// socket IO init

let io  = new Server(server);

io.on("connect", (socket ) => {
  console.log(socket.id);
  socket.on("add", async (msg : string) => {
    const cnt = await backend_tasks_Divyam.count();

    let res;
    if (cnt+1 > 50) {
      if (isRedisAvailable) {
        // flush redis
        isRedisAvailable = false;
        client.del("backend_task_divyam");
        console.log("redis flushed !!");
      }
      res = await backend_tasks_Divyam.create({ text: msg });
    } else {
      // store in mongoDB
      res = await  backend_tasks_Divyam.create({ text: msg });

      // store in redis
      client.lPush("backend_task_divyam", JSON.stringify(msg));
    }
    // io.emit("update_notes" , res)

    // store in DB
  });


  
  
  
});
