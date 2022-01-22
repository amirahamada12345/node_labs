
require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const todoRouter=require("./Routes/todo");
const userRouter = require("./Routes/user");
const { logger} = require("./middleware");

const app = express();

//Middleware
app.use(express.json()); // parse text from http request body => assign on req.body
app.use(logger);
// app.use(auth);

app.use("/todos", todoRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {

    // server logs//السرفر واقع مش شايف الداتا بيس
    res.status(500).json({ message: err.message })
})

mongoose
    .connect("mongodb://localhost:27017/mydb")
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });
