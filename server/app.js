require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/auth");
const express = require("express");
const bodyParser = require("body-parser");
const { login, register } = require("./controllers/auth");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Authe User
app.post("/register", register);
app.post("/login", login);

// Access Api with token
app.get("/welcome", auth, (req, res) => {
  res.send("wellcome to my world...");
});

// check api health check
app.get("/healthCheck", (req, res) => {
  res.send("wellcome to my world...");
});

app.use(express.json());

module.exports = app;
