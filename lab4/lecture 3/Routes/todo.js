const express = require("express");
const {
    Todo,
    validateTodo
} = require("../models/todo");
const {
    catchAsyncErrors
} = require("../middleware");

const router = express.Router();


router.get("/", catchAsyncErrors(async (req, res, next) => {
    const todos = await Todo.find();
    res.json(todos);
}));


router.get("/:id",async (req, res) => {
    const {
        id
    } = req.params;
    const todo = await Todo.findById(id);
    if(!todo) return res.status(404).json({
        message: "the todo not in db becuse his id not found"
    });
   
    res.json(todo);
});

router.delete("/:id", catchAsyncErrors(async (req, res) => {
    const {
        id
    } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({
        message: " id todo not found to delete"
    });

    res.json(todo);

}));


// router.delete("/:id", catchAsyncErrors (async (req, res) => {

//     const { id } = req.params;

//     const todo = await Todo.findByIdAndDelete(id);

//     if (!todo) return res.status(404).json({ message: "List not exist to delete" })

//     res.json(todo);

// }));


router.post("/", async (req, res) => {
    const {
        error
    } = validateTodo(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    })
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});


router.put("/:id", async (req, res) => {
    const {
        error
    } = validateTodo(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    })
    const {
        id
    } = req.params;
    const {
        value
    } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({
        message: " this todo not found to edit "
    })
    todo.value = value;
    await todo.save();
    res.json(todo);
});






module.exports = router;