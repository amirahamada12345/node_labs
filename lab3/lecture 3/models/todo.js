const mongoose=require("mongoose");
const todoSchema= new mongoose.Schema({


    value:String
});

const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;




// const mongoose = require("mongoose");
// const todoSchema = new mongoose.Schema({
//     value: String,
// });
// const Todo = mongoose.model("Todo", todoSchema);
// module.exports = Todo