const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser')
const path=require("path");
const app = express();
app.use(cookieParser());


dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());

app.use(require("./router/auth")); //router files to make our route easy



// app.get("/about",  (req, res) => {
//   res.send("Hello about from Vaishnavas");
// });
// app.get("/signin", (req, res) => {
//   res.send("Hello login from Vaishnavas");
// });

/////////////////////
const __dir = path.resolve();
app.use(express.static(path.join(__dir, '/newclient/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dir, '/newclient/build/index.html'))
); 
/////////////////////

app.get("/signup", (req, res) => {
  res.send("Hello register page from Vaishnavas");
});

const PORT = process.env.PORT;

// app.get("/contact", (req, res) => {
//   // res.cookie("test","arsid");
//   res.send("Hello contact from Vaishnavas");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
