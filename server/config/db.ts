require('dotenv').config();
import mongoose  from 'mongoose';

const url : string | undefined = process.env.MONGO_URL !

 const db = () =>{
    
mongoose.connect(url);
const conn   = mongoose.connection;

conn.once('open' , () => {
    console.log("database connected ");
})
conn.on('error' , (error : Error)=>{
    console.log("error ------------------------------------- " ,  error);
})

}

export = db
// module.exports  = db;