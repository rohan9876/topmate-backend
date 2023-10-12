const router = require("express").Router();
const Guru = require("../models/Guru");
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config();
const verify = require("../verifyToken");

router.post("/profile/update", async (req, res) => {
    try {
      console.log(req.body);
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader.split(" ")[1];
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const currUser = await User.findOne({ _id: new ObjectId(decodedToken.id) });
   //   console.log(decodedToken.id);
    //  console.log(currUser);
      const username = req.body.username;
      if (username !== currUser.username) {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      const updatedGuru = await Guru.findOne({ username: req.body.username });
      if (!updatedGuru) {
        return res.status(404).json({ error: "Guru not found" });
      }
  
      // Update the user's details based on the request body
      updatedGuru.email = req.body.email;
      updatedGuru.experience = req.body.experience;
      updatedGuru.about = req.body.about;
      updatedGuru.review.push(req.body.review);
      updatedGuru.instagram = req.body.instagram;
      updatedGuru.twitter = req.body.twitter;
      updatedGuru.linkdin = req.body.linkdin;
  //    console.log(updatedGuru);
      const guru = await updatedGuru.save();
      return res.status(200).json(guru);
    } catch (err) {
      console.log("Error:", err.message); // Log the detailed error message
      return res.status(500).json(err);
    }
  });
  

router.put("/:id", verify, async (req, res) => {
  //  console.log(req.body);
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }
        try {
            const updatedGuru = await Guru.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            { new: true },
            );
            res.status(200).json(updatedGuru);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your own account!");
    }
});

router.get("/findguru/:username", async(req, res)=>{
    try {
  //    console.log(req.params);
      const { username } = req.params;
  
      // Find sessions matching the provided username
      const guruname = await Guru.find({ username });
       // console.log(guruname);
      return res.status(200).json(guruname);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  })


module.exports = router;
