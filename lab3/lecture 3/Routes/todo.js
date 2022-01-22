const express=require("express");
const Todo=require("../models/todo")
const { auth } = require("../middleware")
const router=express.Router();
router.get("/",async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);



});

router.post("/",async(req,res)=>{
    const{value}=req.body;
    const newtodo= new Todo({value});
    await newtodo.save();
    res.json(newtodo);

});router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    res.json(todo);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id)
    res.json(todo);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const todo = await Todo.findById(id)
  
   todo.value = value;
    await todo.save();
    res.json(todo);
});





module.exports=router;