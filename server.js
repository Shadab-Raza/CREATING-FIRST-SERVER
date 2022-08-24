const express = require('express');

// initialization
const app = express();

app.use(express.json());     // Application will now use json format for data


const port = 3000;

const toDoList = ["Complete Node Bytes", "Play Cricket"];

// http://localhost:3000/todos
app.get("/todos",(req,res) => {
    // callback
    res.status(200).send(toDoList);
});

app.post("/todos",(req,res) => {
    // callback
    let newToDoItem = req.body.item;
    toDoList.push(newToDoItem);
    res.status(201).send({
        message: "Task added successfully",
    })
});

app.delete("/todos", (req,res) => {
    // callback
    const itemToDelete = req.body.item;

    toDoList.find((element, index) => {
        if(element === itemToDelete){
            toDoList.splice(index, 1);
        }
    });

    res.status(202).send({
        message : `Deleted item - ${req.body.item}`
    });
});


//put, patch // all the other methods on a particular routes
app.all("/todos", (req, res) => {
    res.status(501).send();
});

// all the other routes
app.all("*", (req, res) => {
    res.status(404).send();
});


// Calling Port
app.listen(port, () => {
    console.log(`Node.js server started on port ${port}`)
})


