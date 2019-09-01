const express = require('express');
//const router = express.Router();
const userController = require("./../controllers/userController");
const controllers=require("./../controllers/todo")
const appConfig = require("./../config/appConfig")
const mid1=require("./../middlewares/auth")
var cors=require('cors');
var app=express()
let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;
    app.use(cors())
    //to get all lists that contain tasks
    app.get(baseUrl+'/lists/all/:userId/:authToken',mid1.isAuthorized,controllers.getalllists);
    //to view the tasks for particular list
    app.get(baseUrl+'/lists/view/:listId/:authToken',mid1.isAuthorized,controllers.viewBylistId);
    //to get data of all tasks
    app.get(baseUrl+'/task/view/:userId/:listId/:authToken',mid1.isAuthorized,controllers.getalltasks);
  //to get data of a single task for editing task that is preloading the data into form
    app.get(baseUrl+'/task/one/:userId/:listId/:taskId/:authToken',mid1.isAuthorized,controllers.getsingletask);
   //to get the data a singlelist for editing the list and updating 
    app.get(`${baseUrl}/list/:userId/:listId/:authToken`,mid1.isAuthorized,controllers.getsinglelist);
    app.post(`${baseUrl}/users/signup`,userController.signUpFunction);
    app.post(`${baseUrl}/users/login`,userController.loginFunction);
    app.post(`${baseUrl}/logout/:authToken`,mid1.isAuthorized, userController.logout);
    app.post(baseUrl+'/lists/create/:userId/:authToken',mid1.isAuthorized,controllers.createlist);
    app.post(baseUrl+'/lists/delete/:listId/:authToken',mid1.isAuthorized,controllers.deletelist);
    //for creating task
    app.post(baseUrl+'/tasks/create/:userId/:listId/:authToken',mid1.isAuthorized,controllers.createtask);
    app.post(baseUrl+'/task/delete/:userId/:listId/:taskId/:authToken',mid1.isAuthorized,controllers.deletetask);
    app.put(baseUrl+'/lists/edit/:userId/:listId/:authToken',mid1.isAuthorized,controllers.editlist);
    app.put(baseUrl+'/task/edit/:userId/:listId/:taskId/:authToken',mid1.isAuthorized,controllers.edittask)
    
}
module.exports={
    setRouter:setRouter
}