const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')

app.use(cors())

//Import Routes
const authRoute = require("./routes/AuthController");
const contractRoute = require("./routes/ContractController");
const personalRoute = require("./routes/PersonelController");

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT_URL,
    { useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log("connected to db")
);

//Route Middlewares
app.use("/api/user",authRoute);
app.use("/api/web3",contractRoute);
app.use("/api/personel",personalRoute);

app.listen(3000 , () => console.log("Server Up and running"));