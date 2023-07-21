
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv/config");


//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");


//DB Connection

mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true,useUnifiedTopology: true,}
)
.then(() => {
    console.log("DB CONNECTED");
}).catch((error)=>{
    console.log(error)
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Roustes
app.get("/",(req,res)=>{
    res.send("Welcome to blogus Apis");
});
app.use("/blogus", authRoutes);
app.use("/blogus", userRoutes);
app.use("/blogus", blogRoutes);


//PORT
const port = process.env.PORT || 8000;

//Starting server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});
