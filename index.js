import express from 'express';
import mongoose from 'mongoose';
import Tasks from './models/tasksmodal.js';

const app = express()

app.use(express.json())

const port = 5555;

app.get('/', async (req, res) => {
    const tasksList = await Tasks.find();
    res.status(200).json(tasksList);
})

app.post('/', async(req, res) => {
    const {title, date, finished} = req.body;

    const newTask = new Tasks({
        title, date, finished
    });
    const task = await newTask.save();
    res.status(201).json(task);   
})

app.put('/:id', async(req, res) => {
    const {title, date, finished} = req.body;

    const task = await Tasks.findById(req.params.id);

    if(task){
        task.title = title,
        task.date = date,
        task.finished = finished

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    }   
})

app.delete('/:id', async(req, res) => {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Task Deleted!"});   
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

mongoose.connect("mongodb+srv://naazir21:naazir21@cluster0.c6aczf3.mongodb.net/mytasks?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to database");
})