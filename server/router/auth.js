const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const authenticate=require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello from auth.js");
});

//using promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please fill all details" });
//   }
//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "email already registered" });
//     }
//     const user = new User({ name, email, phone, work, password, cpassword }); //user's data is filled (a new document)
//     user.save().then(() => {
//       res.status(201).json({ message: "user registered successfully" });
//     }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//   }).catch(err=>{console.log(err);});

// });

//using async-await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all details" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already registered" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "email already registered" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword }); //user's data is filled (a new document)

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});
//login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });

    if(userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password);
      const token=await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+25892000000),
        httpOnly:true
      })
      
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials(pass)" });
      } 
      else {
        res.json({ message: "User signed in successfully!" });
      }
    }else{
      res.status(400).json({ error: "Invalid credentials" });
    }

    // console.log(userLogin);
    
  } 
  catch (err) {
    console.log(err);
  }
});
//about us
router.get("/about", authenticate, (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
});

//get user data for contact us and home page
router.get("/getdata",authenticate,(req,res)=>{
  console.log("Hello user data");
  res.send(req.rootUser);
})

//contact us pg
router.post("/contact",authenticate,async (req, res) => {
  try{
    const{name,email,phone,message}=req.body;
      
    if(!name||!email||!phone||!message) {
      console.log("eror in contact form");
      return res.json({error:"Please fill the contact form"})
    }  

    const userContact=await User.findOne({_id:req.userID});

    if(userContact){
      const userMessage=await userContact.addMessage(name,email,phone,message)
       await userContact.save();
       res.status(201).json({message:"User's contact saved"});
    }

  }catch(error){
     console.log(error);
  }
});

//logout pg
router.get("/logout", (req, res) => {
  console.log("This is logout pg");
  res.clearCookie("jwtoken",{path:"/"})
  res.status(200).send("User Logout");
});



module.exports = router;
