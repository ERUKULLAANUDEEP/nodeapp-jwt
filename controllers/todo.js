const mongoose=require("mongoose");
var todo=require("../models/todo")
const todoSchema=mongoose.model('todo');
var taskschema=require("../models/task")
const taskSchema=mongoose.model('taskschema')
const response=require('../libs/responseLib');
const express=require("express");
const shortid=require("shortid");
const forvalue=require("./../controllers/userController")
//importing model
let getalllists=(req,res)=>{
    console.log("Came into get all lists at backend")
    todoSchema.find({'userId':req.params.userId})
    .select('-__v-_id')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result==undefined || result==null || result==''){
            
            console.log("no list found")
            res.send("no lists found")
        }
        else{
            
            let apiresponse= response.generate("false","all lists fetched successfully","200",res)
            res.send(result);
        }
    })//end get all lists
}
let getsinglelist=(req,res)=>{
    console.log("came into getsinglelist at backend");
    todoSchema.find({'userId':req.params.userId,'listId':req.params.listId})
    .select('-_v-_id')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result==undefined||result==null||result==''){
            console.log('no list found')
          res.send('no list found')
        }
        else{
            console.log("result is sent")
            res.send(result)
        }

    })
}
let getsingletask=(req,res)=>{
    console.log("came into getsingletask at backend");
    taskSchema.find({'userId':req.params.userId,'listId':req.params.listId,'taskId':req.params.taskId})
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result==undefined||result==null||result==''){
            console.log('no task found')
          res.send('no task found')
        }
        else{
            console.log("result is sent")
            res.send(result)
        }

    })
} 
let getalltasks=(req,res)=>{
    console.log("Came into get all tasks at backend "+req.params.userId +'/'+req.params.listId);
    taskSchema.find({'userId':req.params.userId,'listId':req.params.listId})
    .select('-__v-_id')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else if(result==undefined || result==null || result==''){
            
            console.log("no tasks found")
            res.send("no tasks found")
        }
        else{
            res.send(result);
        }
    })
}

let createlist=(req,res)=>{
    let today  = Date.now()
    let listIds = shortid.generate()
    console.log("this is userid :" +req.body.userId);
    let newlist=new todoSchema({
        userId:req.body.userId,
        listId:listIds,
        title:req.body.title,
        description: req.body.description,
        priority:req.body.priority,
        created:today
    })
    newlist.save((err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }
})
}

let  createtask=(req,res)=>{
    let today=Date.now()
    let taskIds=shortid.generate()
    console.log("entered into create task "+taskIds)
    let newtask=new taskSchema({
        userId:req.params.userId,
        listId:req.body.listId,
        taskId:taskIds,
        task:req.body.taskcontent,
        created:today
    })
    newtask.save((err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else{
            console.log("Task created response:")
            console.log(result)
            res.send(result)
        }
})
}

let deletelist=(req,res)=>{
    todoSchema.remove({'listId':req.params.listId},(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else if(result== undefined||result==null||result==''){
            console.log("no list found")
            res.send("no list found")
        }
        else{
            res.send(result)
        }


    })
}
let deletetask=(req,res)=>{
    console.log("came into delete task at backend")
    taskSchema.remove({'userId':req.params.userId,'listId':req.params.listId,'taskId':req.params.taskId},(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send(err)
        }
        else if(result==undefined||result==null||result==''){

            console.log("no task found")
            res.send("no task found")
        }
        else{
            res.send(result)
        }


    })
}
let editlist=(req,res)=>{

    let options=req.body;
    console.log(options);
    todoSchema.findOneAndUpdate({'userId':req.params.userId,'listId':req.params.listId},options,{multi:true}).exec((err,result)=>{
     if(err)
     {
         console.log(err)
         res.send(err)
     }
     else if(result== undefined||result==null||result==''){
         console.log("no list found")
         res.send("no list found")
     }
     else{
         console.log("result sent from editlist")
         res.send(result)
     }
 
 
    })
 }
 let edittask=(req,res)=>{
     console.log("came to edit task at backend")
     let options=req.body;
     console.log(options)
     taskSchema.findOneAndUpdate({'userId':req.params.userId,'listId':req.params.listId,'taskId':req.params.taskId},options,{multi:true}).exec((err,result)=>{
        if(err)
        {
            console.log("err occiurews")
            console.log(err)
            res.send(err)
        }
        else if(result== undefined||result==null||result==''){
            console.log("no task found")
            res.send("no task found")
        }
        else{
            console.log("result sent from edittask from backend")
            console.log(result)
            res.send(result)
        }

     })
 }
 
let viewBylistId = (req,res)=>{
    todoSchema.findOne({'listId':req.params.listId},(err,result)=>{

     if(err){

        console.log(err)
        res.send(err)
     }
     else if(result==undefined || result==null || result==""){
         console.log("no list found");
         res.send("No list Found");
     }
     else{
         res.send(result)
     }

    })

}
module.exports={
    getalllists:getalllists,
    viewBylistId :viewBylistId,
    createlist:createlist,
    editlist:editlist,
    deletelist:deletelist,
    createtask:createtask,
    getalltasks:getalltasks,
    getsinglelist:getsinglelist,
    deletetask:deletetask,
    edittask:edittask,
    getsingletask:getsingletask
}