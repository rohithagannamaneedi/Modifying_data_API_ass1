const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const user = require("./schema");

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu',async(req,res)=>{
  try {
    const {name,description,price} = req.body;
    if(!name || !price){
      res.status(400).send({msg:"All fields are required"});
    }
    const data = new user({name,description,price});
    await data.save();
    res.status(200).send({msg:"Item created successfully"});
  } catch (error) {
    res.status(500).send({msg:"Something went wrong"});
  }
})

app.get('/menu',async(req,res)=>{
  try {
    const data = await user.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({msg:"Something went wrong"});
  }
})

app.listen(port, async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected successefully");
    console.log(`Example app listening at http://localhost:${port}`);
  }
  catch(error){
    console.log("error",error);
  }
  
  
});
