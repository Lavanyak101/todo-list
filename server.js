//server.js

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/todoList")

var app = express();

app.use(cors());
app.use(express.json());

// Connect to your MongoDB database (replace with your database URL)


const uri = 'mongodb+srv://lavanyak0207:7nHrSQpdKSlWDltO@cluster0.rcm5mqm.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));




// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database
app.get("/getTodoList", (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err))
});

// Add new task to the database
app.post("/addTodoList", (req, res) => {
    TodoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline, 
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Update task fields (including deadline)
app.post("/updateTodoList/:id", (req, res) => {
    const id = req.params.id;
    const updateData = {
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline, 
    };
    TodoModel.findByIdAndUpdate(id, updateData)
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Delete task from the database
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

app.listen(3001, () => {
    console.log('Server running on 3001');
});

