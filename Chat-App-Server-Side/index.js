const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRouters")

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running");
});

// mongoose connection
mongoose.connect(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("server connect db");
  } catch (err) {
    console.log("server is not connected to DB", err.message);
  }
};
connectDB();

app.use("user/",userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server is running......"));
