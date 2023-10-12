const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');

// router.put('/:id', verify, async (req, res) => {
// console.log(req.user.id);
//   if (req.user.id === req.params.id || req.user.isAdmin) {
//     console.log(req.user.id);
//     console.log(req.params.id);
//     if (req.body.password) {
//       req.body.password = CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.SECRET_KEY
//       ).toString();
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body 
//         },
//         { new: true }
//       );
//       console.log(200);
//       return res.status(200).json(updatedUser);
//     } catch (err) {
//       console.log(500);
//       return res.status(500).json(err);
//     }
//   } else {
//     console.log(403);
//     return res.status(403).json('You can update only your own account!');
//   }
// });


router.put('/updateuser', verify, async (req, res) => {
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
// router.get('/find/:id', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       const { password, ...info } = user._doc;
//       res.status(200).json(info);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });