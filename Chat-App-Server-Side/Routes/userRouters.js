const express = require("express");

const Router=express.Router();


Router.post("/login",loginController);
Router.post("/regster",registerController);

module.exports = Router