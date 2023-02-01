const db = require('../config/db')
const mongoose = require("mongoose")


const Schema = mongoose.Schema;

const backend_tasks_Divyam = new Schema({

    text : {
        type : String , 
        require : true
    }
    
})

module.exports = mongoose.model('backend_tasks_Divyam' , backend_tasks_Divyam)
