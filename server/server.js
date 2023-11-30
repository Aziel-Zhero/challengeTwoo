const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("../src/routes/authRoutes");
const userRoutes = require("../src/routes/userRoutes");
const userModel = require("../src/models/userModel");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server, userModel };
