const router = require("express").Router();
const User = require("../models/User");
const Guru = require("../models/Guru");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv").config();
const verify = require("../verifyToken");

router.post("/register", async (req, res)=>{ 
    try{
      const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
          type: req.body.type,
          password: encryptedPassword
        });

        const newGuru = new Guru({
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
        });
        const check = await User.findOne({username: req.body.username});
        if(!check){
          const user = await newUser.save();
          await newGuru.save();
          res.status(201).json(user);
        }
        else{
          res.status(404).json("username already taken");
        }
    } catch(err){
        console.log("Error:", err.message); // Log the detailed error message
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res)=>{
  try{
    const username = req.body.username;
    const user = await User.findOne({username: username});
    console.log(req.body);
    if(!user){
      return res.status(500).json("user not found");
    }
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if(decryptedPassword !== req.body.password){
      return res.status(504).json("password is wrong");
    } 
 
    const accessToken = jwt.sign(
      { id: user._id,  _username: this.username },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );
    console.log(accessToken);
    const { password, ...info } = user._doc;
     return res.status(200).json({...info, accessToken });
  }
  catch(err){   
    console.log(err.message);
    return res.status(404).json("err");
  }
})


router.post("/updateuser", verify, async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Update the user's details based on the request body
    user.email = req.body.email;
    user.password = req.body.password;

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


module.exports = router;
