const express = require("express");
const { connection } = require("./database/db");
const { router } = require("./routes/userRoute.js");
// const{ cors } = require("cors")
const{Users}=require("./model/userSchema");

const app= express();
const PORT = 5000;
// app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
});

connection ();