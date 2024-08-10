const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const kodersRoutes = require("./routes/koders.router");
const mentorsRoutes = require("./routes/mentors.router");
const generationsRoutes = require("./routes/generations.router");
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/koders", kodersRoutes);
app.use("/mentors", mentorsRoutes);
app.use("/generations", generationsRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Kodemia API",
  });
});

module.exports = app;
