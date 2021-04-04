const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");


//Import Routes
const authRoute = require("./routes/auth");
const contractRoute = require("./routes/smartContract");

const jsonParser = bodyParser.json()


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT_URL,
    { useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log("connected to db")
);

//Route Middlewares
app.use("/api/user",jsonParser,authRoute);
app.use("/api/web3",jsonParser,contractRoute);

app.listen(3000 , () => console.log("Server Up and running"));