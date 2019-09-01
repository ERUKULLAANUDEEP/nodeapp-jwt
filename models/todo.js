const mongoose = require('mongoose');
//import schema
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    userId:{
        type:String
    },
    listId: {
        type: String,
        unique: true
    },

    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''

    },
    priority:{
        type: String,
        default: ''

    },
    created:{
        type:Date,
        default:Date.now
    },
}
)
mongoose.model('todo',todoSchema );