const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const { ObjectId } = require('mongodb');
const Guru = require("../models/Guru");
const dotenv = require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");

router.post("/register", verify, async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const currUser = await User.findOne({_id : new ObjectId(decodedToken.id)});
    console.log(decodedToken.id);
    console.log(currUser);
    const username = req.body.username;
    if (username !== currUser.username) {
      return res.status(403).json({ error: "Unauthorized" });
    } 

    // const user = await User.findOne({ username: username });
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    const newSession = new Session({
      username: username,
      name: req.body.name,
      sessionname: req.body.sessionname,
      topic: req.body.topic,
      date: req.body.date,
      start: req.body.starttime,
      end: req.body.endtime,
      description: req.body.description
    });

    await newSession.save();
    return res.status(200).json({ message: "Session created successfully" });
  } catch (err) {
    console.log("Error:", err.message);
    return res.status(503).json({ error: "Internal server error" });
  }
});


router.get("/findsessions/:username", async(req, res)=>{
  try {
 //   console.log(req.params);
    const { username } = req.params;

    // Find sessions matching the provided username
    const sessions = await Session.find({ username });

    console.log(sessions);
    return res.status(200).json(sessions);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
})

router.get("/findallsession", async(req, res) => {
  try{
    const allSession = await Session.find({}).exec();
    console.log(allSession);
    return res.status(200).json(allSession);
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json(err.message);
  }
})
module.exports = router;
