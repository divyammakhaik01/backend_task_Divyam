import * as mongoose from "mongoose";


const Schema = mongoose.Schema;

const backend_tasks_DivyamSchema = new Schema({

    text : {
        type : String , 
        require : true
    }
    
})


 const backend_tasks_Divyam = mongoose.model('backend_tasks_Divyam' , backend_tasks_DivyamSchema)

 export default backend_tasks_Divyam
 
//  module.exports 
