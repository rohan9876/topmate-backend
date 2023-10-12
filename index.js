const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const guruRoute = require("./routes/guru");
const sessionRoute = require("./routes/session");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute);
app.use("/api/guru", guruRoute);
app.use("/api/session", sessionRoute);


mongoose.connect(
    process.env.MONGO_URL, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(4000, ()=>{
    console.log("port is running on port 4000");
})