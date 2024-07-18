const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const loginController = expressAsyncHandler(async (res,req) => {
  const { name,password } = req.body;
  console.log('Request body:', req.body);
  const user = userModel.findOne({name});
  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      toke:generateToken(user._id)
    })
  }
  else{
    throw new Error("Invalid User name or Password")
  }

});

// registration
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Request body:', req.body);
  // Checks for all fields
  if (!name || !email || !password) {
    res.sendStatus(400);
    throw new Error("All fields must be filled");
  }

  // Pre-existing user check
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.sendStatus(400);
    throw new Error("User already exists");
  }

  // User name already exists check
  const userNameExist = await userModel.findOne({ name });
  if (userNameExist) {
    res.sendStatus(400);
    throw new Error("User name already exists");
  }

  // Create an entry in the DB
  const user = await userModel.create({ name, email, password });
  
  // Send a success response
 if(user){
  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
  });
 }
 else{
  res.status(400)
  throw new Error("Regitration failed")
 }
});

module.exports = { registerController, loginController };
