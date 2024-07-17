const express = require("express");
const { loginController, registerController } = require("../Controller/userController");

const Router=express.Router();


Router.post("/login",loginController);
Router.post("/regster",registerController);

module.exports = Router