const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://amanpatel3045:amanpatel3045@cluster0.ws0asss.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.listen("5000", () => {
  console.log("backend is running");
});
