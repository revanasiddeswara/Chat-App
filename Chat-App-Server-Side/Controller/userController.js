const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler=require("express-async-handler")



const loginController = async () => {};
const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // checks for all fields
  if (!name || !email || !password) {
    res.send(400);
    throw Error("All Fields Are filled");
  }

  // Pre-Existing User
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw Error("User already exist");
  }

  // user name already exists
  const userNameExist = await userModel.findOne({ email });
  if (userNameExist) {
    throw Error("User Name already exist");
  }

//   create an entry in the DB
const user = await userModel.create({name,email,password})
};
