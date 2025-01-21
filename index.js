require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5001
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
