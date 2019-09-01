const mongoose=require('mongoose');
const Schema=mongoose.Schema
const taskschema=new Schema({
    userId:{
        type:String
    },
    listId:{
        type: String,
    },
    taskId:{
        type:String,
    },
    task:{
        type:String
        },
    created:{
        type:Date,
        default:Date.now
    }
})
mongoose.model('taskschema',taskschema);